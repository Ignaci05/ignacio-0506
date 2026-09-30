import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { WalletService } from '../../services/wallet.service';
import { SnailPayPaymentResponse } from '@app/shared';
import { Navbar } from './Navbar';
import { KpiStats } from './KpiStats';
import { BettingDonutChart } from './BettingDonutChart';
import { SnailBarChart } from './SnailBarChart';
import { TransactionHistory } from './TransactionHistory';
import { SnailPayModal } from './SnailPayModal';
import {
    WalletDetailModal,
    BetsDetailModal,
    WinRateDetailModal,
    PerformanceDetailModal,
    SnailRacesDetailModal,
} from './details';

export const DashboardView: React.FC = () => {
    const { user } = useAuth();
    const [balance, setBalance] = useState<number>(0);
    const [transactions, setTransactions] = useState<SnailPayPaymentResponse[]>([]);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);

    // Estados de las Vistas Detalladas (Modales)
    const [isWalletDetailOpen, setIsWalletDetailOpen] = useState<boolean>(false);
    const [isBetsDetailOpen, setIsBetsDetailOpen] = useState<boolean>(false);
    const [isWinRateDetailOpen, setIsWinRateDetailOpen] = useState<boolean>(false);
    const [isPerformanceDetailOpen, setIsPerformanceDetailOpen] = useState<boolean>(false);
    const [isSnailRacesDetailOpen, setIsSnailRacesDetailOpen] = useState<boolean>(false);

    // Cargar saldo e historial de transacciones desde LocalStorage
    const loadWalletData = useCallback(() => {
        if (!user) return;
        const wallet = WalletService.getWallet(user.id);
        const txs = WalletService.getTransactions(user.id);
        setBalance(wallet.balance);
        setTransactions(txs);
    }, [user]);

    useEffect(() => {
        loadWalletData();
    }, [loadWalletData]);

    const handleRechargeComplete = () => {
        loadWalletData();
    };

    return (
        <div className="min-h-screen bg-[#051424] text-slate-100 flex flex-col">
            {/* Navbar Superior con Saldo en Vivo y Perfil */}
            <Navbar
                balance={balance}
                onOpenDepositModal={() => setIsDepositModalOpen(true)}
                onOpenWalletDetail={() => setIsWalletDetailOpen(true)}
            />

            {/* Contenedor Principal del Dashboard */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* Banner de Bienvenida */}
                <div className="p-6 bg-[#0d1c2d] border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xl">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span>Carreras en Directo</span>
                            </span>
                            <span className="text-xs text-slate-400">Temporada Oficial 2026</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            Bienvenido de vuelta,{' '}{user?.fullName}
                        </h1>
                        <p className="text-xs text-slate-400">
                            Panel de control principal. Consulta tus estadísticas de juego, historial y gestiona tus fondos.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsDepositModalOpen(true)}
                        className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-950/50 self-start md:self-auto cursor-pointer flex items-center gap-2"
                    >
                        <span>+ Recargar con SnailPay</span>
                    </button>
                </div>

                {/* 1. Tarjetas de KPIs y Métricas con Vistas Detalladas al Click */}
                <KpiStats
                    balance={balance}
                    totalBets={42}
                    wonBets={24}
                    onOpenDeposit={() => setIsDepositModalOpen(true)}
                    onOpenWalletDetail={() => setIsWalletDetailOpen(true)}
                    onOpenBetsDetail={() => setIsBetsDetailOpen(true)}
                    onOpenWinRateDetail={() => setIsWinRateDetailOpen(true)}
                    onOpenPerformanceDetail={() => setIsPerformanceDetailOpen(true)}
                />

                {/* 2. Sección de Gráficas: Donut de Apuestas y Barras de 6 Caracoles */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <BettingDonutChart
                        won={24}
                        lost={18}
                        onOpenDetail={() => setIsBetsDetailOpen(true)}
                    />
                    <SnailBarChart
                        onOpenDetail={() => setIsSnailRacesDetailOpen(true)}
                    />
                </div>

                {/* 3. Tabla de Auditoría e Historial de SnailPay */}
                <TransactionHistory
                    transactions={transactions}
                    onOpenDeposit={() => setIsDepositModalOpen(true)}
                />

            </main>

            {/* Footer Minimalista */}
            <footer className="border-t border-slate-800/80 py-6 bg-[#051424] text-center text-xs text-slate-500">
                <p>SnailBet © 2026 — Plataforma Oficial de Carreras de Caracoles y Apuestas Deportivas</p>
            </footer>

            {/* Modal de Recarga SnailPay */}
            <SnailPayModal
                isOpen={isDepositModalOpen}
                onClose={() => setIsDepositModalOpen(false)}
                onRechargeComplete={handleRechargeComplete}
            />

            {/* Modal 1: Detalle de Billetera y Fondos */}
            <WalletDetailModal
                isOpen={isWalletDetailOpen}
                onClose={() => setIsWalletDetailOpen(false)}
                balance={balance}
                transactions={transactions}
                onOpenDeposit={() => setIsDepositModalOpen(true)}
            />

            {/* Modal 2: Historial Detallado de Apuestas */}
            <BetsDetailModal
                isOpen={isBetsDetailOpen}
                onClose={() => setIsBetsDetailOpen(false)}
                totalBets={42}
                wonBets={24}
            />

            {/* Modal 3: Análisis de Efectividad y Acierto */}
            <WinRateDetailModal
                isOpen={isWinRateDetailOpen}
                onClose={() => setIsWinRateDetailOpen(false)}
                wonBets={24}
                totalBets={42}
            />

            {/* Modal 4: Balance Financiero y Rendimiento */}
            <PerformanceDetailModal
                isOpen={isPerformanceDetailOpen}
                onClose={() => setIsPerformanceDetailOpen(false)}
            />

            {/* Modal 5: Clasificación y Fichas de Caracoles */}
            <SnailRacesDetailModal
                isOpen={isSnailRacesDetailOpen}
                onClose={() => setIsSnailRacesDetailOpen(false)}
            />
        </div>
    );
};