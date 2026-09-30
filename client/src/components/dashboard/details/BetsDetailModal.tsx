import React, { useState } from 'react';
import { Modal, Button, Badge } from '../../ui';
import { ApprovedBadgeIcon, RejectedBadgeIcon, AnalyticsColorIcon } from '../../icons';

interface BetItem {
    id: string;
    raceName: string;
    snailId: string;
    snailName: string;
    snailColor: string;
    betType: string;
    odds: number;
    amount: number;
    payout: number;
    status: 'won' | 'lost';
    timestamp: string;
}

const MOCK_BETS: BetItem[] = [
    { id: 'BET-8492', raceName: 'Carrera 6 - Gran Premio', snailId: '1', snailName: 'Turbo', snailColor: '#22c55e', betType: 'Ganador', odds: 2.40, amount: 50, payout: 120, status: 'won', timestamp: '17:45' },
    { id: 'BET-8491', raceName: 'Carrera 5 - Pista Rápida', snailId: '2', snailName: 'Flash', snailColor: '#6366f1', betType: 'Ganador', odds: 2.80, amount: 40, payout: 112, status: 'won', timestamp: '16:30' },
    { id: 'BET-8490', raceName: 'Carrera 5 - Pista Rápida', snailId: '6', snailName: 'Velocity', snailColor: '#64748b', betType: 'Exacta', odds: 5.50, amount: 30, payout: 0, status: 'lost', timestamp: '16:25' },
    { id: 'BET-8489', raceName: 'Carrera 4 - Circuito Central', snailId: '3', snailName: 'Comet', snailColor: '#38bdf8', betType: 'Ganador', odds: 3.20, amount: 60, payout: 192, status: 'won', timestamp: '15:10' },
    { id: 'BET-8488', raceName: 'Carrera 4 - Circuito Central', snailId: '5', snailName: 'Shelly', snailColor: '#f43f5e', betType: 'Podio', odds: 1.90, amount: 50, payout: 0, status: 'lost', timestamp: '15:05' },
    { id: 'BET-8487', raceName: 'Carrera 3 - Derby Primavera', snailId: '4', snailName: 'Helix', snailColor: '#fbbf24', betType: 'Ganador', odds: 3.90, amount: 40, payout: 156, status: 'won', timestamp: '13:50' },
    { id: 'BET-8486', raceName: 'Carrera 3 - Derby Primavera', snailId: '6', snailName: 'Velocity', snailColor: '#64748b', betType: 'Ganador', odds: 6.20, amount: 25, payout: 0, status: 'lost', timestamp: '13:45' },
    { id: 'BET-8485', raceName: 'Carrera 2 - Pista Húmeda', snailId: '5', snailName: 'Shelly', snailColor: '#f43f5e', betType: 'Ganador', odds: 4.50, amount: 35, payout: 157.5, status: 'won', timestamp: '12:20' },
    { id: 'BET-8484', raceName: 'Carrera 2 - Pista Húmeda', snailId: '2', snailName: 'Flash', snailColor: '#6366f1', betType: 'Ganador', odds: 2.70, amount: 45, payout: 0, status: 'lost', timestamp: '12:15' },
    { id: 'BET-8483', raceName: 'Carrera 1 - Apertura', snailId: '1', snailName: 'Turbo', snailColor: '#22c55e', betType: 'Ganador', odds: 2.10, amount: 100, payout: 210, status: 'won', timestamp: '11:00' },
    { id: 'BET-8482', raceName: 'Carrera 1 - Apertura', snailId: '3', snailName: 'Comet', snailColor: '#38bdf8', betType: 'Exacta', odds: 4.80, amount: 30, payout: 0, status: 'lost', timestamp: '10:55' },
    { id: 'BET-8481', raceName: 'Jornada Anterior', snailId: '1', snailName: 'Turbo', snailColor: '#22c55e', betType: 'Ganador', odds: 2.30, amount: 50, payout: 115, status: 'won', timestamp: 'Ayer' },
];

interface BetsDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalBets?: number;
    wonBets?: number;
}

export const BetsDetailModal: React.FC<BetsDetailModalProps> = ({
    isOpen,
    onClose,
    totalBets = 42,
    wonBets = 24,
}) => {
    const [filter, setFilter] = useState<'all' | 'won' | 'lost'>('all');
    const lostBets = totalBets - wonBets;

    const filteredBets = MOCK_BETS.filter((b) => {
        if (filter === 'won') return b.status === 'won';
        if (filter === 'lost') return b.status === 'lost';
        return true;
    });

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Historial Detallado de Apuestas"
            subtitle="Registro completo de apuestas realizadas, cuotas y liquidaciones"
            maxWidth="max-w-3xl"
        >
            <div className="space-y-6">

                {/* Resumen de Métricas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 bg-[#051424] border border-slate-800 rounded-xl flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase">Apuestas Totales</span>
                            <div className="text-xl font-bold text-white font-mono mt-0.5">{totalBets}</div>
                        </div>
                        <AnalyticsColorIcon className="w-8 h-8" />
                    </div>

                    <div className="p-4 bg-[#051424] border border-emerald-500/30 rounded-xl flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase">Ganadas</span>
                            <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">{wonBets}</div>
                        </div>
                        <ApprovedBadgeIcon className="w-7 h-7" />
                    </div>

                    <div className="p-4 bg-[#051424] border border-rose-500/30 rounded-xl flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase">Perdidas</span>
                            <div className="text-xl font-bold text-rose-400 font-mono mt-0.5">{lostBets}</div>
                        </div>
                        <RejectedBadgeIcon className="w-7 h-7" />
                    </div>
                </div>

                {/* Filtros de Apuestas */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 bg-[#051424] p-1 rounded-xl border border-slate-800 text-xs">
                        <button
                            type="button"
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1 rounded-lg font-medium transition ${filter === 'all' ? 'bg-[#1c2b3c] text-white border border-slate-700 shadow-sm' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Todas ({MOCK_BETS.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilter('won')}
                            className={`px-3 py-1 rounded-lg font-medium transition ${filter === 'won' ? 'bg-[#1c2b3c] text-emerald-400 border border-slate-700 shadow-sm' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Ganadas
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilter('lost')}
                            className={`px-3 py-1 rounded-lg font-medium transition ${filter === 'lost' ? 'bg-[#1c2b3c] text-rose-400 border border-slate-700 shadow-sm' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Perdidas
                        </button>
                    </div>

                    <span className="text-xs text-slate-400 font-mono">Mostrando {filteredBets.length} registros recientes</span>
                </div>

                {/* Tabla de Apuestas */}
                <div className="overflow-x-auto border border-slate-800/80 rounded-xl">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#051424] border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="py-3 px-3">ID / Carrera</th>
                                <th className="py-3 px-3">Caracol Elegido</th>
                                <th className="py-3 px-3">Tipo / Cuota</th>
                                <th className="py-3 px-3">Importe</th>
                                <th className="py-3 px-3">Retorno</th>
                                <th className="py-3 px-3 text-right">Resultado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-mono">
                            {filteredBets.map((bet) => (
                                <tr key={bet.id} className="hover:bg-[#051424]/60 transition">
                                    <td className="py-3 px-3">
                                        <div className="font-bold text-slate-200">#{bet.id}</div>
                                        <div className="text-[10px] text-slate-400 font-sans truncate max-w-[140px]">
                                            {bet.raceName} • {bet.timestamp}
                                        </div>
                                    </td>
                                    <td className="py-3 px-3">
                                        <div className="flex items-center gap-2 font-sans font-medium text-white">
                                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: bet.snailColor }}></span>
                                            <span>{bet.snailName}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3 font-sans">
                                        <div className="text-slate-300 font-medium">{bet.betType}</div>
                                        <div className="text-[11px] text-emerald-400 font-mono">x{bet.odds.toFixed(2)}</div>
                                    </td>
                                    <td className="py-3 px-3 font-bold text-slate-200">
                                        ${bet.amount.toFixed(2)} USD
                                    </td>
                                    <td className="py-3 px-3 font-bold">
                                        {bet.status === 'won' ? (
                                            <span className="text-emerald-400">+${bet.payout.toFixed(2)} USD</span>
                                        ) : (
                                            <span className="text-slate-500">$0.00 USD</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-3 text-right">
                                        {bet.status === 'won' ? (
                                            <Badge variant="success" className="gap-1 font-mono text-[10px]">
                                                <ApprovedBadgeIcon className="w-3 h-3" />
                                                <span>Ganada</span>
                                            </Badge>
                                        ) : (
                                            <Badge variant="error" className="gap-1 font-mono text-[10px]">
                                                <RejectedBadgeIcon className="w-3 h-3" />
                                                <span>Perdida</span>
                                            </Badge>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="pt-2 border-t border-slate-800 flex justify-end">
                    <Button variant="outline" size="sm" onClick={onClose}>
                        Cerrar Historial
                    </Button>
                </div>

            </div>
        </Modal>
    );
};
