import {
    SnailPayPaymentRequest,
    SnailPayPaymentResponse,
    WalletState
} from '@app/shared';

const WALLET_KEY_PREFIX = 'snailbet_wallet_';
const TRANSACTIONS_KEY_PREFIX = 'snailbet_txs_';

export class WalletService {

    // Obtiene el saldo actual del usuario desde LocalStorage (inicia en $0.00)
    public static getWallet(userId: string): WalletState {
        const data = localStorage.getItem(`${WALLET_KEY_PREFIX}${userId}`);
        if (!data) {
            const initialWallet: WalletState = {
                balance: 0.0,
                lastUpdated: new Date().toISOString(),
            };
            localStorage.setItem(`${WALLET_KEY_PREFIX}${userId}`, JSON.stringify(initialWallet));
            return initialWallet;
        }
        return JSON.parse(data);
    }

    // Obtiene el historial de transacciones de SnailPay guardadas en LocalStorage
    public static getTransactions(userId: string): SnailPayPaymentResponse[] {
        const data = localStorage.getItem(`${TRANSACTIONS_KEY_PREFIX}${userId}`);
        return data ? JSON.parse(data) : [];
    }

    // Guarda una transacción en el historial de LocalStorage (requisito 2.4 del PDF)
    public static saveTransaction(userId: string, tx: SnailPayPaymentResponse): void {
        const txs = this.getTransactions(userId);
        txs.unshift(tx); // Colocar la más reciente primero
        localStorage.setItem(`${TRANSACTIONS_KEY_PREFIX}${userId}`, JSON.stringify(txs));
    }

    // Procesa la recarga comunicándose con el backend Express (POST /api/snailpay/charge)
    public static async processRecharge(request: SnailPayPaymentRequest): Promise<SnailPayPaymentResponse> {
        const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
        const response = await fetch(`${baseUrl}/api/snailpay/charge`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        const data: SnailPayPaymentResponse = await response.json();

        // Guardar siempre el resultado en el historial de LocalStorage
        this.saveTransaction(request.payer_id, data);

        // Si el cobro fue aprobado, aumentar el saldo en LocalStorage inmediatamente
        if (data.status === 'approved') {
            const currentWallet = this.getWallet(request.payer_id);
            const newBalance = Number((currentWallet.balance + data.transaction_amount).toFixed(2));

            const updatedWallet: WalletState = {
                balance: newBalance,
                lastUpdated: new Date().toISOString(),
            };

            localStorage.setItem(`${WALLET_KEY_PREFIX}${request.payer_id}`, JSON.stringify(updatedWallet));
        }

        return data;
    }
}