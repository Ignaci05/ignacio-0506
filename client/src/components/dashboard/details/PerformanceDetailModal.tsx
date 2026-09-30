import React from 'react';
import { Modal, Button, Card } from '../../ui';
import { PercentageColorIcon } from '../../icons';

interface PerformanceDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PROFIT_BY_SNAIL = [
    { name: 'Turbo', wagered: 520, returned: 705, net: 185, roi: 35.6, color: '#22c55e' },
    { name: 'Comet', wagered: 290, returned: 365, net: 75, roi: 25.9, color: '#38bdf8' },
    { name: 'Flash', wagered: 340, returned: 410, net: 70, roi: 20.6, color: '#6366f1' },
    { name: 'Shelly', wagered: 260, returned: 305, net: 45, roi: 17.3, color: '#f43f5e' },
    { name: 'Helix', wagered: 240, returned: 275, net: 35, roi: 14.6, color: '#fbbf24' },
    { name: 'Velocity', wagered: 90, returned: 0, net: -90, roi: -100.0, color: '#64748b' },
];

export const PerformanceDetailModal: React.FC<PerformanceDetailModalProps> = ({
    isOpen,
    onClose,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Balance Financiero y Rendimiento"
            subtitle="Auditoría de capital invertido, retornos brutos y beneficio neto por caracol"
            maxWidth="max-w-2xl"
        >
            <div className="space-y-6">

                {/* Banner de Beneficio Neto */}
                <div className="p-5 bg-gradient-to-br from-[#051424] to-[#0d1c2d] border border-emerald-500/30 rounded-2xl flex items-center justify-between shadow-lg">
                    <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Beneficio Neto Acumulado
                        </span>
                        <div className="text-3xl font-bold text-emerald-400 font-mono">
                            +$320.00 <span className="text-xs text-slate-400 font-normal">USD</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                            <span className="text-emerald-400 font-semibold">+18.4% ROI Global</span>
                            <span>•</span>
                            <span>42 operaciones liquidadas</span>
                        </div>
                    </div>
                    <PercentageColorIcon className="w-14 h-14 object-contain drop-shadow-md" />
                </div>

                {/* Resumen Contable */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Card className="p-4 space-y-1">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase">Capital Total Apostado</span>
                        <div className="text-lg font-bold text-white font-mono">
                            $1,740.00 USD
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">42 apuestas en total</span>
                    </Card>

                    <Card className="p-4 space-y-1">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase">Retorno Bruto Cobrado</span>
                        <div className="text-lg font-bold text-emerald-400 font-mono">
                            $2,060.00 USD
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono">24 apuestas premiadas</span>
                    </Card>

                    <Card className="p-4 space-y-1">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase">Beneficio Medio / Apuesta</span>
                        <div className="text-lg font-bold text-indigo-400 font-mono">
                            +$7.62 USD
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">Promedio ponderado</span>
                    </Card>
                </div>

                {/* Desglose de Rendimiento por Caracol */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Rentabilidad por Caracol
                    </h4>
                    <div className="overflow-x-auto border border-slate-800/80 rounded-xl">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#051424] border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                <tr>
                                    <th className="py-2.5 px-3">Caracol</th>
                                    <th className="py-2.5 px-3">Apostado</th>
                                    <th className="py-2.5 px-3">Cobrado</th>
                                    <th className="py-2.5 px-3">Beneficio Neto</th>
                                    <th className="py-2.5 px-3 text-right">ROI</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 font-mono">
                                {PROFIT_BY_SNAIL.map((row) => (
                                    <tr key={row.name} className="hover:bg-[#051424]/60 transition">
                                        <td className="py-2.5 px-3 font-sans font-medium text-white flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }}></span>
                                            <span>{row.name}</span>
                                        </td>
                                        <td className="py-2.5 px-3 text-slate-300">
                                            ${row.wagered.toFixed(2)}
                                        </td>
                                        <td className="py-2.5 px-3 text-slate-300">
                                            ${row.returned.toFixed(2)}
                                        </td>
                                        <td className="py-2.5 px-3 font-bold">
                                            {row.net >= 0 ? (
                                                <span className="text-emerald-400">+${row.net.toFixed(2)}</span>
                                            ) : (
                                                <span className="text-rose-400">-${Math.abs(row.net).toFixed(2)}</span>
                                            )}
                                        </td>
                                        <td className="py-2.5 px-3 text-right font-bold">
                                            {row.roi >= 0 ? (
                                                <span className="text-emerald-400">+{row.roi.toFixed(1)}%</span>
                                            ) : (
                                                <span className="text-rose-400">{row.roi.toFixed(1)}%</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-2 border-t border-slate-800 flex justify-end">
                    <Button variant="outline" size="sm" onClick={onClose}>
                        Cerrar Balance
                    </Button>
                </div>

            </div>
        </Modal>
    );
};
