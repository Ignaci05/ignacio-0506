import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { WalletColorIcon, CreditCardColorIcon, LogoutColorIcon, SnailLogoIcon } from '../icons';
import { Button } from '../ui';

interface NavbarProps {
    balance: number;
    onOpenDepositModal: () => void;
    onOpenWalletDetail?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ balance, onOpenDepositModal, onOpenWalletDetail }) => {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-40 w-full bg-[#051424]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-md">
            <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

                {/* Logo y Nombre de Marca */}
                <div className="flex items-center gap-3">
                    <SnailLogoIcon className="w-11 h-11 object-contain drop-shadow-md" />
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-white tracking-tight uppercase">SnailBet</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
                                En Vivo
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-400 hidden sm:block">Carreras y Apuestas Deportivas</p>
                    </div>
                </div>

                {/* Acciones del Usuario (Saldo en vivo, Botón Recargar y Perfil) */}
                <div className="flex items-center gap-3 sm:gap-4">

                    {/* Widget de Saldo en Vivo */}
                    <div
                        onClick={onOpenWalletDetail}
                        className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#0d1c2d] border border-emerald-500/30 shadow-sm transition ${onOpenWalletDetail ? 'cursor-pointer hover:border-emerald-400/60 hover:bg-[#112438]' : ''
                            }`}
                        title={onOpenWalletDetail ? 'Click para ver detalle de billetera' : 'Saldo disponible'}
                    >
                        <WalletColorIcon className="w-6 h-6" />
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider leading-none">
                                Saldo
                            </span>
                            <span className="text-sm font-bold text-emerald-400 font-mono leading-tight">
                                ${balance.toFixed(2)} <span className="text-[10px] text-slate-400 font-normal">USD</span>
                            </span>
                        </div>
                    </div>

                    {/* Botón Cargar Saldo (Abre SnailPay Modal) */}
                    <Button
                        type="button"
                        variant="success"
                        size="sm"
                        onClick={onOpenDepositModal}
                        leftIcon={<CreditCardColorIcon className="w-4 h-4" />}
                    >
                        <span>Cargar Saldo</span>
                    </Button>

                    {/* Perfil del Usuario Registrado */}
                    <div className="hidden md:flex items-center gap-2.5 pl-2 border-l border-slate-800">
                        <div className="w-9 h-9 rounded-xl bg-[#1c2b3c] border border-slate-700 flex items-center justify-center text-indigo-400 font-bold text-xs uppercase">
                            {user?.fullName.slice(0, 2) || 'US'}
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-xs font-semibold text-white leading-none">{user?.fullName}</span>
                            <span className="text-[10px] text-slate-400 font-mono leading-tight truncate max-w-[140px]">
                                {user?.email}
                            </span>
                        </div>
                    </div>

                    {/* Botón Logout */}
                    <button
                        type="button"
                        onClick={logout}
                        title="Cerrar Sesión"
                        className="p-2 rounded-xl bg-[#0d1c2d] hover:bg-rose-950/30 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 transition-colors"
                    >
                        <LogoutColorIcon className="w-5 h-5" />
                    </button>

                </div>
            </div>
        </header>
    );
};