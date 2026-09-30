import { WalletColorIcon, AnalyticsColorIcon, TargetColorIcon, PercentageColorIcon } from '../icons';
import { Card } from '../ui';

interface KpiStatsProps {
    balance: number;
    totalBets: number;
    wonBets: number;
    onOpenDeposit: () => void;
    onOpenWalletDetail?: () => void;
    onOpenBetsDetail?: () => void;
    onOpenWinRateDetail?: () => void;
    onOpenPerformanceDetail?: () => void;
}

export const KpiStats: React.FC<KpiStatsProps> = ({
    balance,
    totalBets,
    wonBets,
    onOpenDeposit,
    onOpenWalletDetail,
    onOpenBetsDetail,
    onOpenWinRateDetail,
    onOpenPerformanceDetail,
}) => {
    const winRate = totalBets > 0 ? ((wonBets / totalBets) * 100).toFixed(1) : '0.0';

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* KPI 1: Saldo Billetera */}
            <Card
                className="p-5 flex flex-col justify-between space-y-3 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-950/30 transition cursor-pointer group"
                onClick={onOpenWalletDetail}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider group-hover:text-emerald-400 transition-colors">
                            Saldo Billetera
                        </span>
                        <div className="text-2xl font-bold text-white font-mono mt-1">
                            ${balance.toFixed(2)} <span className="text-xs text-slate-400 font-normal">USD</span>
                        </div>
                    </div>
                    <WalletColorIcon className="w-10 h-10 group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                    <span className="text-emerald-400 font-medium group-hover:underline">
                        Ver fondos →
                    </span>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenDeposit();
                        }}
                        className="font-semibold text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1"
                    >
                        + Recargar
                    </button>
                </div>
            </Card>

            {/* KPI 2: Total Apuestas */}
            <Card
                className="p-5 flex flex-col justify-between space-y-3 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-950/30 transition cursor-pointer group"
                onClick={onOpenBetsDetail}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider group-hover:text-indigo-400 transition-colors">
                            Apuestas Totales
                        </span>
                        <div className="text-2xl font-bold text-white font-mono mt-1">
                            {totalBets}
                        </div>
                    </div>
                    <AnalyticsColorIcon className="w-10 h-10 group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-1.5">
                        <span className="text-emerald-400 font-semibold">+6 hoy</span>
                        <span>/</span>
                        <span>{totalBets - 6} previas</span>
                    </div>
                    <span className="text-indigo-400 font-medium group-hover:underline">
                        Historial →
                    </span>
                </div>
            </Card>

            {/* KPI 3: Tasa de Efectividad */}
            <Card
                className="p-5 flex flex-col justify-between space-y-3 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-950/30 transition cursor-pointer group"
                onClick={onOpenWinRateDetail}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider group-hover:text-amber-400 transition-colors">
                            Tasa de Acierto
                        </span>
                        <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
                            {winRate}%
                        </div>
                    </div>
                    <TargetColorIcon className="w-10 h-10 group-hover:scale-105 transition-transform" />
                </div>
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${winRate}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                        <span>{wonBets} ganadas</span>
                        <span className="text-amber-400 font-sans group-hover:underline">Análisis →</span>
                    </div>
                </div>
            </Card>

            {/* KPI 4: Rendimiento Neto */}
            <Card
                className="p-5 flex flex-col justify-between space-y-3 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-950/30 transition cursor-pointer group"
                onClick={onOpenPerformanceDetail}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider group-hover:text-emerald-400 transition-colors">
                            Rendimiento Neto
                        </span>
                        <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
                            +$320.00 <span className="text-xs text-slate-400 font-normal">USD</span>
                        </div>
                    </div>
                    <PercentageColorIcon className="w-10 h-10 object-contain drop-shadow-sm group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-400 pt-2 border-t border-slate-800/80 font-medium">
                    <span>+18.4% ROI</span>
                    <span className="group-hover:underline">Balance →</span>
                </div>
            </Card>

        </div>
    );
};