import React from 'react';
import { SnailPayPaymentResponse } from '@app/shared';
import { Modal, Button, Badge, Card } from '../../ui';
import { WalletColorIcon, CreditCardColorIcon, ApprovedBadgeIcon, RejectedBadgeIcon, WarningBadgeIcon } from '../../icons';

interface WalletDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    balance: number;
    transactions: SnailPayPaymentResponse[];
    onOpenDeposit: () => void;
}

export const WalletDetailModal: React.FC<WalletDetailModalProps> = ({
    isOpen,
    onClose,
    balance,
    transactions,
    onOpenDeposit,
}) => {
    const approvedTxs = transactions.filter((t) => t.status === 'approved');
    const totalDeposited = approvedTxs.reduce((sum, t) => sum + (t.transaction_amount || 0), 0);

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return (
                    <Badge variant="success" className="gap-1 font-mono text-[10px]">
                        <ApprovedBadgeIcon className="w-3 h-3" />
                        <span>Aprobada</span>
                    </Badge>
                );
            case 'rejected':
                return (
                    <Badge variant="error" className="gap-1 font-mono text-[10px]">
                        <RejectedBadgeIcon className="w-3 h-3" />
                        <span>Rechazada</span>
                    </Badge>
                );
            case 'error':
            default:
                return (
                    <Badge variant="warning" className="gap-1 font-mono text-[10px]">
                        <WarningBadgeIcon className="w-3 h-3" />
                        <span>Error 500</span>
                    </Badge>
                );
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Gestión de Billetera y Fondos"
            subtitle="Detalle de saldo disponible, límites operativos y métodos de pago"
            maxWidth="max-w-2xl"
        >
            <div className="space-y-6">

                {/* Resumen Principal de Saldo */}
                <div className="p-5 bg-gradient-to-br from-[#051424] to-[#0d1c2d] border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-lg">
                    <div className="flex items-center gap-4">
                        <WalletColorIcon className="w-12 h-12 flex-shrink-0" />
                        <div>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Saldo Disponible
                            </span>
                            <div className="text-3xl font-bold text-white font-mono mt-0.5">
                                ${balance.toFixed(2)} <span className="text-xs text-slate-400 font-normal">USD</span>
                            </div>
                            <span className="text-[11px] text-emerald-400 font-medium">Fondos 100% líquidos para apuestas</span>
                        </div>
                    </div>

                    <Button
                        variant="success"
                        size="md"
                        onClick={() => {
                            onClose();
                            onOpenDeposit();
                        }}
                        leftIcon={<CreditCardColorIcon className="w-5 h-5" />}
                    >
                        <span>+ Cargar Saldo</span>
                    </Button>
                </div>

                {/* Métricas Operativas de la Billetera */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Card className="p-4 space-y-1">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase">Total Depositado</span>
                        <div className="text-lg font-bold text-white font-mono">
                            ${totalDeposited.toFixed(2)} USD
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{approvedTxs.length} recargas exitosas</span>
                    </Card>

                    <Card className="p-4 space-y-1">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase">Límite Diario</span>
                        <div className="text-lg font-bold text-white font-mono">
                            $10,000.00 USD
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono">Sin restricciones</span>
                    </Card>

                    <Card className="p-4 space-y-1">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase">Estado de Cuenta</span>
                        <div className="text-lg font-bold text-emerald-400">
                            Verificada
                        </div>
                        <span className="text-[10px] text-slate-400">Nivel 1 (Estándar)</span>
                    </Card>
                </div>

                {/* Pasarela y Métodos de Pago Activos */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Pasarelas de Pago Habilitadas
                    </h4>
                    <div className="p-4 bg-[#051424] border border-slate-800 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <CreditCardColorIcon className="w-8 h-8" />
                            <div>
                                <h5 className="text-sm font-bold text-white">SnailPay Gateway</h5>
                                <p className="text-xs text-slate-400">Tarjetas Visa, Mastercard y Débito Internacional</p>
                            </div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                            Operativa
                        </span>
                    </div>
                </div>

                {/* Últimos Movimientos */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                            Últimas Transacciones ({transactions.length})
                        </h4>
                    </div>

                    {transactions.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-400 border border-slate-800/80 rounded-xl bg-[#051424]">
                            No hay transacciones registradas. Carga saldo para comenzar a apostar.
                        </div>
                    ) : (
                        <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                            {transactions.slice(0, 5).map((tx) => (
                                <div
                                    key={tx.id}
                                    className="p-3 rounded-xl bg-[#051424] border border-slate-800/80 flex items-center justify-between text-xs"
                                >
                                    <div className="space-y-0.5">
                                        <div className="font-semibold text-slate-200">
                                            Recarga SnailPay #{tx.reference || tx.id.slice(0, 8)}
                                        </div>
                                        <div className="text-[10px] text-slate-400 font-mono">
                                            {new Date(tx.date_created).toLocaleDateString('es-MX')} • •••• {tx.card_number ? tx.card_number.slice(-4) : '1234'}
                                        </div>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <div className="font-bold text-white font-mono">
                                            +${tx.transaction_amount ? tx.transaction_amount.toFixed(2) : '0.00'} USD
                                        </div>
                                        {renderStatusBadge(tx.status)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Botón de Cierre */}
                <div className="pt-2 border-t border-slate-800 flex justify-end">
                    <Button variant="outline" size="sm" onClick={onClose}>
                        Cerrar Detalle
                    </Button>
                </div>

            </div>
        </Modal>
    );
};
