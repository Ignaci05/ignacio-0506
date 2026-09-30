import React, { useState } from 'react';
import { Modal, Button, Badge } from '../../ui';
import { SnailLogoIcon, ApprovedBadgeIcon } from '../../icons';

interface SnailRacesDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SnailProfile {
    id: string;
    position: number;
    name: string;
    victories: number;
    podiums: number;
    avgSpeed: string;
    topSpeed: string;
    weight: string;
    odds: string;
    form: string;
    color: string;
}

const SNAIL_STANDINGS: SnailProfile[] = [
    { id: '1', position: 1, name: 'Turbo', victories: 2, podiums: 4, avgSpeed: '9.8 cm/s', topSpeed: '10.2 cm/s', weight: '28g', odds: 'x2.10', form: 'Excelente (2 vic)', color: '#22c55e' },
    { id: '2', position: 2, name: 'Flash', victories: 1, podiums: 4, avgSpeed: '9.4 cm/s', topSpeed: '9.9 cm/s', weight: '26g', odds: 'x2.80', form: 'En Forma', color: '#6366f1' },
    { id: '3', position: 3, name: 'Comet', victories: 1, podiums: 4, avgSpeed: '9.2 cm/s', topSpeed: '9.7 cm/s', weight: '29g', odds: 'x3.20', form: 'En Forma', color: '#38bdf8' },
    { id: '4', position: 4, name: 'Helix', victories: 1, podiums: 3, avgSpeed: '8.9 cm/s', topSpeed: '9.3 cm/s', weight: '27g', odds: 'x3.90', form: 'Estable', color: '#fbbf24' },
    { id: '5', position: 5, name: 'Shelly', victories: 1, podiums: 3, avgSpeed: '8.6 cm/s', topSpeed: '9.0 cm/s', weight: '31g', odds: 'x4.50', form: 'Estable', color: '#f43f5e' },
    { id: '6', position: 6, name: 'Velocity', victories: 0, podiums: 0, avgSpeed: '8.1 cm/s', topSpeed: '8.5 cm/s', weight: '30g', odds: 'x6.00', form: 'En Recuperación', color: '#64748b' },
];

const TODAY_RACES = [
    { raceNum: 6, name: 'Gran Premio de Velocidad', winner: 'Turbo', second: 'Flash', third: 'Comet', time: '17:40', odds: 'x2.40' },
    { raceNum: 5, name: 'Circuito Central - Tarde', winner: 'Flash', second: 'Shelly', third: 'Helix', time: '16:20', odds: 'x2.80' },
    { raceNum: 4, name: 'Pista Rápida Derby', winner: 'Comet', second: 'Flash', third: 'Turbo', time: '15:00', odds: 'x3.20' },
    { raceNum: 3, name: 'Clásico Primavera', winner: 'Helix', second: 'Comet', third: 'Shelly', time: '13:40', odds: 'x3.90' },
    { raceNum: 2, name: 'Pista Húmeda Trofeo', winner: 'Shelly', second: 'Flash', third: 'Turbo', time: '12:10', odds: 'x4.50' },
    { raceNum: 1, name: 'Carrera Inaugural', winner: 'Turbo', second: 'Comet', third: 'Helix', time: '10:50', odds: 'x2.10' },
];

export const SnailRacesDetailModal: React.FC<SnailRacesDetailModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [activeTab, setActiveTab] = useState<'standings' | 'races'>('standings');

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Clasificación Oficial y Carreras del Día"
            subtitle="Ficha técnica de los 6 caracoles y resultados certificados de la jornada"
            maxWidth="max-w-3xl"
        >
            <div className="space-y-6">

                {/* Banner de Jornada */}
                <div className="p-4 bg-[#051424] border border-slate-800 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <SnailLogoIcon className="w-12 h-12 object-contain drop-shadow-md" />
                        <div>
                            <h4 className="text-sm font-bold text-white">Temporada Oficial 2026</h4>
                            <p className="text-xs text-slate-400">6 carreras completadas hoy • 6 caracoles activos en circuito</p>
                        </div>
                    </div>
                    <Badge variant="success" className="gap-1 font-mono text-xs">
                        <ApprovedBadgeIcon className="w-3.5 h-3.5" />
                        <span>Oficial</span>
                    </Badge>
                </div>

                {/* Tabs de Selección */}
                <div className="grid grid-cols-2 bg-[#051424] p-1 rounded-xl border border-slate-800 text-xs">
                    <button
                        type="button"
                        onClick={() => setActiveTab('standings')}
                        className={`py-2 font-semibold rounded-lg transition ${activeTab === 'standings' ? 'bg-[#1c2b3c] text-white border border-slate-700 shadow-sm' : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        Tabla de Posiciones y Fichas (6)
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('races')}
                        className={`py-2 font-semibold rounded-lg transition ${activeTab === 'races' ? 'bg-[#1c2b3c] text-white border border-slate-700 shadow-sm' : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        Resultados de Carreras de Hoy (6)
                    </button>
                </div>

                {/* TAB 1: Tabla de Clasificación */}
                {activeTab === 'standings' && (
                    <div className="overflow-x-auto border border-slate-800/80 rounded-xl">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#051424] border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                <tr>
                                    <th className="py-2.5 px-3 text-center">Pos</th>
                                    <th className="py-2.5 px-3">Caracol</th>
                                    <th className="py-2.5 px-3 text-center">Victorias</th>
                                    <th className="py-2.5 px-3 text-center">Podios</th>
                                    <th className="py-2.5 px-3">Vel. Media</th>
                                    <th className="py-2.5 px-3">Cuota</th>
                                    <th className="py-2.5 px-3">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 font-mono">
                                {SNAIL_STANDINGS.map((snail) => (
                                    <tr key={snail.id} className="hover:bg-[#051424]/60 transition">
                                        <td className="py-3 px-3 text-center font-bold text-slate-300">
                                            #{snail.position}
                                        </td>
                                        <td className="py-3 px-3 font-sans font-medium text-white flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: snail.color }}></span>
                                            <span className="font-bold">{snail.name}</span>
                                        </td>
                                        <td className="py-3 px-3 text-center font-bold text-emerald-400">
                                            {snail.victories}
                                        </td>
                                        <td className="py-3 px-3 text-center text-slate-300">
                                            {snail.podiums}
                                        </td>
                                        <td className="py-3 px-3 text-slate-300">
                                            {snail.avgSpeed}
                                        </td>
                                        <td className="py-3 px-3 font-bold text-indigo-400">
                                            {snail.odds}
                                        </td>
                                        <td className="py-3 px-3 font-sans text-[11px]">
                                            <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-slate-300 border border-slate-700">
                                                {snail.form}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* TAB 2: Resultados de las 6 Carreras */}
                {activeTab === 'races' && (
                    <div className="space-y-2.5">
                        {TODAY_RACES.map((race) => (
                            <div
                                key={race.raceNum}
                                className="p-3.5 bg-[#051424] border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs"
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-white">Carrera #{race.raceNum}</span>
                                        <span className="text-slate-400">•</span>
                                        <span className="text-slate-300">{race.name}</span>
                                    </div>
                                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                                        Hora: {race.time} • Cuota ganadora: <strong className="text-emerald-400">{race.odds}</strong>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 font-mono text-[11px] self-start sm:self-auto">
                                    <div className="flex items-center gap-1">
                                        <span className="text-amber-400 font-bold">1º</span>
                                        <span className="text-white font-bold">{race.winner}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-400">
                                        <span>2º</span>
                                        <span>{race.second}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-500">
                                        <span>3º</span>
                                        <span>{race.third}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="pt-2 border-t border-slate-800 flex justify-end">
                    <Button variant="outline" size="sm" onClick={onClose}>
                        Cerrar Ficha
                    </Button>
                </div>

            </div>
        </Modal>
    );
};
