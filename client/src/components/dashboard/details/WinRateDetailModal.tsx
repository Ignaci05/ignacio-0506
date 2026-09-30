import React from 'react';
import { Modal, Button, Card } from '../../ui';
import { TargetColorIcon } from '../../icons';

interface WinRateDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    wonBets?: number;
    totalBets?: number;
}

const SNAIL_EFFECTIVENESS = [
    { name: 'Turbo', won: 9, total: 12, rate: 75.0, color: '#22c55e' },
    { name: 'Flash', won: 5, total: 8, rate: 62.5, color: '#6366f1' },
    { name: 'Comet', won: 4, total: 7, rate: 57.1, color: '#38bdf8' },
    { name: 'Helix', won: 3, total: 6, rate: 50.0, color: '#fbbf24' },
    { name: 'Shelly', won: 3, total: 7, rate: 42.9, color: '#f43f5e' },
    { name: 'Velocity', won: 0, total: 2, rate: 0.0, color: '#64748b' },
];

const ODDS_BRACKETS = [
    { label: 'Cuotas Favoritas (< x2.20)', won: 9, total: 11, rate: 81.8, color: 'bg-emerald-500' },
    { label: 'Cuotas Intermedias (x2.20 - x3.50)', won: 11, total: 19, rate: 57.9, color: 'bg-indigo-500' },
    { label: 'Cuotas Sorpresa (> x3.50)', won: 4, total: 12, rate: 33.3, color: 'bg-amber-500' },
];

export const WinRateDetailModal: React.FC<WinRateDetailModalProps> = ({
    isOpen,
    onClose,
    wonBets = 24,
    totalBets = 42,
}) => {
    const winRate = totalBets > 0 ? ((wonBets / totalBets) * 100).toFixed(1) : '0.0';

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Análisis de Efectividad y Acierto"
            subtitle="Desglose estadístico de rendimiento por caracol, rango de cuotas y rachas"
            maxWidth="max-w-2xl"
        >
            <div className="space-y-6">

                {/* KPI Principal de Acierto */}
                <div className="p-5 bg-[#051424] border border-amber-500/30 rounded-2xl flex items-center justify-between shadow-lg">
                    <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Tasa Global de Acierto
                        </span>
                        <div className="text-4xl font-bold text-amber-400 font-mono">
                            {winRate}%
                        </div>
                        <span className="text-xs text-slate-300 font-mono">
                            {wonBets} apuestas acertadas de {totalBets} jugadas
                        </span>
                    </div>
                    <TargetColorIcon className="w-14 h-14" />
                </div>

                {/* Rachas y Récords */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Card className="p-4 space-y-1">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase">Racha Actual</span>
                        <div className="text-xl font-bold text-emerald-400 font-mono">
                            3 Victorias
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">En las últimas 3 carreras</span>
                    </Card>

                    <Card className="p-4 space-y-1">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase">Mejor Racha</span>
                        <div className="text-xl font-bold text-indigo-400 font-mono">
                            5 Consecutivas
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">Récord histórico</span>
                    </Card>

                    <Card className="p-4 space-y-1">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase">Cuota Media Ganada</span>
                        <div className="text-xl font-bold text-white font-mono">
                            x2.65
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono">Rango de alta rentabilidad</span>
                    </Card>
                </div>

                {/* Efectividad por Caracol */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Efectividad por Caracol Apostado
                    </h4>
                    <div className="space-y-2">
                        {SNAIL_EFFECTIVENESS.map((snail) => (
                            <div key={snail.name} className="p-3 bg-[#051424] border border-slate-800 rounded-xl space-y-1.5">
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: snail.color }}></span>
                                        <span className="font-semibold text-white">{snail.name}</span>
                                    </div>
                                    <div className="font-mono text-slate-300">
                                        <span className="text-emerald-400 font-bold">{snail.won}</span> / {snail.total} aciertos ({snail.rate.toFixed(1)}%)
                                    </div>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${snail.rate}%`, backgroundColor: snail.color }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desglose por Rango de Cuotas */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Rendimiento por Rango de Cuotas
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {ODDS_BRACKETS.map((bracket) => (
                            <div key={bracket.label} className="p-3 bg-[#051424] border border-slate-800 rounded-xl space-y-2">
                                <span className="text-[11px] font-medium text-slate-300 block">{bracket.label}</span>
                                <div className="text-lg font-bold text-white font-mono">{bracket.rate}%</div>
                                <div className="text-[10px] text-slate-400 font-mono">{bracket.won} ganadas de {bracket.total}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-2 border-t border-slate-800 flex justify-end">
                    <Button variant="outline" size="sm" onClick={onClose}>
                        Cerrar Análisis
                    </Button>
                </div>

            </div>
        </Modal>
    );
};
