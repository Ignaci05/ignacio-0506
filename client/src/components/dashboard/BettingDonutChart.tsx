import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '../ui';

interface BettingDonutChartProps {
    won?: number;
    lost?: number;
    onOpenDetail?: () => void;
}

export const BettingDonutChart: React.FC<BettingDonutChartProps> = ({
    won = 24,
    lost = 18,
    onOpenDetail,
}) => {
    const total = won + lost;
    const wonPercentage = ((won / total) * 100).toFixed(1);
    const lostPercentage = ((lost / total) * 100).toFixed(1);

    // Agregamos un 'id' único y estable a cada elemento
    const data = [
        { id: 'bets-won', name: 'Apuestas Ganadas', value: won, color: '#22c55e' },
        { id: 'bets-lost', name: 'Apuestas Perdidas', value: lost, color: '#f43f5e' },
    ];

    return (
        <Card className="p-6 flex flex-col justify-between space-y-4">
            {/* Header de la Gráfica */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                        Distribución de Apuestas
                    </h3>
                    <p className="text-xs text-slate-400">Histórico de rendimiento y efectividad</p>
                </div>
                {onOpenDetail ? (
                    <button
                        type="button"
                        onClick={onOpenDetail}
                        className="px-2.5 py-1 rounded-lg bg-[#1c2b3c] hover:bg-[#25384e] text-xs font-mono text-emerald-400 font-semibold border border-slate-700 transition"
                    >
                        Ver Detalle →
                    </button>
                ) : (
                    <span className="px-2.5 py-1 rounded-lg bg-[#1c2b3c] text-xs font-mono text-slate-300 font-semibold border border-slate-700">
                        Total: {total}
                    </span>
                )}
            </div>

            {/* Contenedor Donut con Recharts */}
            <div className="relative h-56 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0d1c2d',
                                borderColor: '#334155',
                                borderRadius: '12px',
                                color: '#fff',
                                fontSize: '12px',
                            }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={90}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                        >
                            {/* Usamos entry.id como key estable (resuelve SonarLint S6479) */}
                            {data.map((entry) => (
                                <Cell key={`donut-${entry.id}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Texto Central dentro del Donut */}
                <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-white font-mono leading-none">{total}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-1">Apuestas</span>
                </div>
            </div>

            {/* Leyenda y Porcentajes */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80 text-xs">
                <div className="p-3 rounded-xl bg-[#051424] border border-slate-800 flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-300 font-medium">Ganadas</span>
                    </div>
                    <div className="flex items-baseline justify-between font-mono">
                        <span className="text-base font-bold text-emerald-400">{won}</span>
                        <span className="text-xs text-slate-400">{wonPercentage}%</span>
                    </div>
                </div>

                <div className="p-3 rounded-xl bg-[#051424] border border-slate-800 flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        <span className="text-slate-300 font-medium">Perdidas</span>
                    </div>
                    <div className="flex items-baseline justify-between font-mono">
                        <span className="text-base font-bold text-rose-400">{lost}</span>
                        <span className="text-xs text-slate-400">{lostPercentage}%</span>
                    </div>
                </div>
            </div>

            {/* Métricas secundarias */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
                <span>Mayor cuota: <strong className="text-emerald-400">x4.80</strong></span>
                <span>Racha actual: <strong className="text-indigo-400">3 victorias</strong></span>
            </div>
        </Card>
    );
};