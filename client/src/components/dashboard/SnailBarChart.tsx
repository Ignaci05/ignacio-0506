import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { Card } from '../ui';

// Datos de los 6 caracoles competidores (Suma total de victorias = 6 carreras diarias)
const SNAIL_RACE_DATA = [
    { id: '1', name: 'Turbo', victories: 2, color: '#22c55e', speed: '9.8 cm/s' },
    { id: '2', name: 'Flash', victories: 1, color: '#6366f1', speed: '9.4 cm/s' },
    { id: '3', name: 'Comet', victories: 1, color: '#38bdf8', speed: '9.2 cm/s' },
    { id: '4', name: 'Helix', victories: 1, color: '#fbbf24', speed: '8.9 cm/s' },
    { id: '5', name: 'Shelly', victories: 1, color: '#f43f5e', speed: '8.6 cm/s' },
    { id: '6', name: 'Velocity', victories: 0, color: '#64748b', speed: '8.1 cm/s' },
];

interface SnailBarChartProps {
    onOpenDetail?: () => void;
}

export const SnailBarChart: React.FC<SnailBarChartProps> = ({ onOpenDetail }) => {
    const totalRaces = SNAIL_RACE_DATA.reduce((acc, curr) => acc + curr.victories, 0);

    return (
        <Card className="p-6 flex flex-col justify-between space-y-4">
            {/* Header de la Gráfica */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                        Victorias Diarias por Caracol
                    </h3>
                    <p className="text-xs text-slate-400">
                        6 carreras disputadas hoy (Suma exacta = {totalRaces} victorias)
                    </p>
                </div>
                {onOpenDetail ? (
                    <button
                        type="button"
                        onClick={onOpenDetail}
                        className="px-2.5 py-1 rounded-lg bg-[#1c2b3c] hover:bg-[#25384e] text-xs font-mono text-emerald-400 font-semibold border border-slate-700 transition"
                    >
                        Ver Clasificación →
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase">
                            Circuito en Directo
                        </span>
                    </div>
                )}
            </div>

            {/* Gráfica de Barras con Recharts */}
            <div className="h-56 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={SNAIL_RACE_DATA}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <XAxis
                            dataKey="name"
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={{ stroke: '#334155' }}
                        />
                        <YAxis
                            allowDecimals={false}
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={{ stroke: '#334155' }}
                            domain={[0, 3]}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const item = payload[0].payload;
                                    return (
                                        <div className="bg-[#0d1c2d] border border-slate-700 p-3 rounded-xl shadow-xl text-xs space-y-1">
                                            <p className="font-bold text-white">{item.name}</p>
                                            <p className="text-emerald-400 font-mono">Victorias: {item.victories}</p>
                                            <p className="text-slate-400">Velocidad media: {item.speed}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="victories" radius={[8, 8, 0, 0]}>
                            {SNAIL_RACE_DATA.map((entry) => (
                                <Cell key={`bar-${entry.id}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Lista detallada de los 6 caracoles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
                {SNAIL_RACE_DATA.map((snail) => (
                    <div key={snail.id} className="p-2 rounded-lg bg-[#051424] border border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 truncate">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: snail.color }}></span>
                            <span className="text-slate-300 font-medium truncate">{snail.name}</span>
                        </div>
                        <span className="text-white font-bold pl-1">{snail.victories} {snail.victories === 1 ? 'vic' : 'vics'}</span>
                    </div>
                ))}
            </div>

            {/* Pie de validación */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>6 participantes activos</span>
                <span className="text-emerald-400 font-semibold">Resultados oficiales verificados</span>
            </div>
        </Card>
    );
};