import {
    SnailPayPaymentRequest,
    SnailPayPaymentResponse,
    TransactionStatus} from '@app/shared';
import crypto from 'node:crypto'

export class SnailPayService {

    //Procesamiento de pagos y respuestas en casos correspondientes
    public processPayment(request: SnailPayPaymentRequest): SnailPayPaymentResponse {
        const { cardNumber, expirationDate, cvv, amount, payer_id, payer_email } = request;

        //Error de sistema simulado (500 / Timeout)
        //Si la tarjeta termina en 9999, se simula una caída del servicio
        if (cardNumber.endsWith('9999')) {
            const error: any = new Error('SnailPay Gateway Timeout: Fallo interno del servicio');
            error.statusCode = 500;
            error.statusDetail = 'error_system_failure';
            throw error;
        }

        //Cobro exitoso (en base a requerimientos)
        const isExactTestCard =
            cardNumber === '1234123412341234' &&
            expirationDate === '12/26' &&
            cvv === '543' &&
            amount > 0;

        if (isExactTestCard) {
            return this.buildResponse({
                status: 'approved',
                status_detail: 'approved_successful',
                amount,
                payer_id,
                payer_email,
                cardNumber,
                cvv,
                authorizationCode: `AUTH-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
            });
        }

        //Errores de transacción (Rechazado)

        //CVV diferente de 543 con respecto a la tarjeta de pruebas
        if (cardNumber === '1234123412341234' && cvv !== '543') {
            return this.buildResponse({
                status: 'rejected',
                status_detail: 'rejected_invalid_cvv',
                amount,
                payer_id,
                payer_email,
                cardNumber,
                cvv,
                authorizationCode: null,
            });
        }

        //Fecha vencida año < 26
        if (this.isCardExpired(expirationDate)) {
            return this.buildResponse({
                status: 'rejected',
                status_detail: 'rejected_expired_card',
                amount,
                payer_id,
                payer_email,
                cardNumber,
                cvv,
                authorizationCode: null,
            });
        }

        //Fondos insuficientes / rechazo general
        return this.buildResponse({
            status: 'rejected',
            status_detail: 'rejected_insufficient_funds',
            amount,
            payer_id,
            payer_email,
            cardNumber,
            cvv,
            authorizationCode: null,
        });
    }

    // Método auxiliar para validar si la tarjeta ya expiró
    private isCardExpired(expirationDate: string): boolean {
        const [expMonthStr, expYearStr] = expirationDate.split('/');
        const expMonth = Number.parseInt(expMonthStr, 10);
        // Convierte '26' a 2026
        const expYear = Number.parseInt(`20${expYearStr}`, 10);

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        // La tarjeta está vencida si el año es menor al actual, 
        // o si estamos en el mismo año pero el mes ya pasó
        if (expYear < currentYear) return true;
        if (expYear === currentYear && expMonth < currentMonth) return true;

        return false;
    }

    //Método auxiliar para construir la respuesta con campos requesitados
    private buildResponse(params: {
        status: TransactionStatus;
        status_detail: string;
        amount: number;
        payer_id: string;
        payer_email: string;
        cardNumber: string;
        cvv: string;
        authorizationCode: string | null;
    }): SnailPayPaymentResponse {
        return {
            id: crypto.randomUUID(),
            status: params.status,
            status_detail: params.status_detail,
            transaction_amount: params.amount,
            date_created: new Date().toISOString(),
            authorization_code: params.authorizationCode,
            reference: `REF-SNAIL-${Date.now().toString().slice(-6)}`,
            payer_id: params.payer_id,
            payer_email: params.payer_email,
            card_number: params.cardNumber,
            cvv: params.cvv,
        };
    }
}
