import React, { useState } from 'react';
import { SnailPayPaymentResponse } from '@app/shared';
import { Card, Badge, Button } from '../ui';
import { ApprovedBadgeIcon, RejectedBadgeIcon, WarningBadgeIcon } from '../icons';

interface TransactionHistoryProps {
    transactions: SnailPayPaymentResponse[];
    onOpenDeposit: () => void;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
    transactions,
    onOpenDeposit,
}) => {
    const [filter, setFilter] = useState<'all' | 'approved' | 'rejected' | 'error'>('all');

    const filteredTransactions = transactions.filter((tx) => {
        if (filter === 'all') return true;
        return tx.status === filter;
    });

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return (
                    <Badge variant="success" className="gap-1 font-mono">
                        <ApprovedBadgeIcon className="w-3.5 h-3.5" />
                        <span>Aprobada</span>
                    </Badge>
                );
            case 'rejected':
                return (
                    <Badge variant="error" className="gap-1 font-mono">
                        <RejectedBadgeIcon className="w-3.5 h-3.5" />
                        <span>Rechazada</span>
                    </Badge>
                );
            case 'error':
            default:
                return (
                    <Badge variant="warning" className="gap-1 font-mono">
                        <WarningBadgeIcon className="w-3.5 h-3.5" />
                        <span>Error 500</span>
                    </Badge>
                );
        }
    };

    return (
        <Card className="p-6 space-y-4">
            {/* Header y Filtros */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                        Historial de Operaciones SnailPay
                    </h3>
                    <p className="text-xs text-slate-400">Registro detallado de depósitos y recargas de saldo</p>
                </div>

                {/* Filtros de Estado */}
                <div className="flex items-center gap-1.5 bg-[#051424] p-1 rounded-xl border border-slate-800 self-start sm:self-auto text-xs">
                    <button
                        type="button"
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1 rounded-lg font-medium transition ${filter === 'all' ? 'bg-[#1c2b3c] text-white border border-slate-700 shadow-sm' : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        Todas ({transactions.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilter('approved')}
                        className={`px-3 py-1 rounded-lg font-medium transition ${filter === 'approved' ? 'bg-[#1c2b3c] text-emerald-400 border border-slate-700 shadow-sm' : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        Aprobadas
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilter('rejected')}
                        className={`px-3 py-1 rounded-lg font-medium transition ${filter === 'rejected' ? 'bg-[#1c2b3c] text-rose-400 border border-slate-700 shadow-sm' : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        Rechazadas
                    </button>
                </div>
            </div>

            {/* Tabla de Transacciones */}
            {filteredTransactions.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mx-auto text-slate-500 font-mono text-xl">
                        #
                    </div>
                    <p className="text-sm font-medium text-slate-300">No hay operaciones registradas con este filtro</p>
                    <p className="text-xs text-slate-500">Recarga saldo con SnailPay para ver las operaciones aquí.</p>
                    <Button variant="success" size="sm" onClick={onOpenDeposit} className="mt-2">
                        Realizar Primera Recarga
                    </Button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead>
                            <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                <th className="py-3 px-3">ID Operación</th>
                                <th className="py-3 px-3">Fecha y Hora</th>
                                <th className="py-3 px-3">Tarjeta</th>
                                <th className="py-3 px-3">Tipo</th>
                                <th className="py-3 px-3">Monto</th>
                                <th className="py-3 px-3 text-right">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-mono">
                            {filteredTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-[#051424]/60 transition">
                                    <td className="py-3 px-3 text-slate-300 font-semibold truncate max-w-[120px]" title={tx.id}>
                                        #{tx.reference || tx.id.slice(0, 8)}
                                    </td>
                                    <td className="py-3 px-3 text-slate-400">
                                        {new Date(tx.date_created).toLocaleString('es-MX', {
                                            dateStyle: 'short',
                                            timeStyle: 'medium',
                                        })}
                                    </td>
                                    <td className="py-3 px-3 text-slate-300">
                                        •••• {tx.card_number ? tx.card_number.slice(-4) : '1234'}
                                    </td>
                                    <td className="py-3 px-3 text-slate-400 font-sans">
                                        Recarga SnailPay
                                    </td>
                                    <td className="py-3 px-3 font-bold text-white">
                                        ${tx.transaction_amount ? tx.transaction_amount.toFixed(2) : '0.00'} USD
                                    </td>
                                    <td className="py-3 px-3 text-right">
                                        {renderStatusBadge(tx.status)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Card>
    );
};