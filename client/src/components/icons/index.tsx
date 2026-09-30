import React from 'react';

interface IconProps {
    className?: string;
    size?: number;
}

// 1. Billetera con Dinero (Saldo Disponible)
export const WalletColorIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="10" width="40" height="26" rx="3" fill="#4ade80" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="18" y="14" width="28" height="18" rx="2" fill="#22c55e" />
        <circle cx="32" cy="23" r="6" fill="#f8fafc" stroke="#0f172a" strokeWidth="2.5" />
        <path d="M32 19.5v7M30.5 21h3a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h3" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 24h48a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V28a4 4 0 0 1 4-4Z" fill="#fbbf24" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M4 31h56" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 50h30" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        <path d="M42 34h15a5 5 0 0 1 5 5v2a5 5 0 0 1-5 5H42a2 2 0 0 1-2-2V36a2 2 0 0 1 2-2Z" fill="#f97316" stroke="#0f172a" strokeWidth="2.5" />
        <circle cx="53" cy="40" r="3" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
    </svg>
);

// 2. Tarjeta de Crédito (Pasarela SnailPay)
export const CreditCardColorIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="14" width="52" height="36" rx="6" fill="#6366f1" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round" />
        <rect x="6" y="22" width="52" height="8" fill="#1e1b4b" />
        <rect x="14" y="34" width="10" height="8" rx="2" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
        <circle cx="44" cy="38" r="4" fill="#f43f5e" />
        <circle cx="50" cy="38" r="4" fill="#fbbf24" fillOpacity="0.8" />
    </svg>
);

// 3. Gráfica de Barras (Victorias de Caracoles)
export const AnalyticsColorIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 56h48" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="12" y="32" width="10" height="24" rx="2" fill="#f43f5e" stroke="#0f172a" strokeWidth="2.5" />
        <rect x="27" y="20" width="10" height="36" rx="2" fill="#fbbf24" stroke="#0f172a" strokeWidth="2.5" />
        <rect x="42" y="12" width="10" height="44" rx="2" fill="#22c55e" stroke="#0f172a" strokeWidth="2.5" />
        <path d="M12 24l16-10 12 6 14-12" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M48 8h6v6" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// 4. Diana / Objetivo (Tasa de Acierto / Win Rate)
export const TargetColorIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="24" fill="#ef4444" stroke="#0f172a" strokeWidth="3" />
        <circle cx="32" cy="32" r="17" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
        <circle cx="32" cy="32" r="10" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
        <circle cx="32" cy="32" r="3.5" fill="#facc15" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M32 32l16-16M48 16l4-1-1 4" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        <path d="M46 22l6-6" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

// 5. Cerrar Sesión
export const LogoutColorIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="24" height="44" rx="4" fill="#f43f5e" stroke="#0f172a" strokeWidth="3" />
        <circle cx="24" cy="32" r="2.5" fill="#facc15" />
        <path d="M34 32h20M46 22l10 10-10 10" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// 6. Badges de Estado (Aprobado, Rechazado, Error 500)
export const ApprovedBadgeIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" fill="#22c55e" stroke="#0f172a" strokeWidth="2.5" />
        <path d="M16 24l5 5 11-11" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const RejectedBadgeIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" fill="#ef4444" stroke="#0f172a" strokeWidth="2.5" />
        <path d="M17 17l14 14M31 17l-14 14" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
);

export const WarningBadgeIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none">
        <path d="M24 6l18 32H6L24 6z" fill="#f59e0b" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M24 19v9M24 32v1" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

// 7. Caracol (Logo Oficial SnailBet)
export const SnailLogoIcon: React.FC<{ className?: string; alt?: string }> = ({
    className = 'w-10 h-10 object-contain',
    alt = 'SnailBet Logo'
}) => (
    <img src="/icons/snail-logo.png" className={className} alt={alt} />
);

// 8. Porcentaje con Moneda (Rendimiento Neto / ROI)
export const PercentageColorIcon: React.FC<{ className?: string; alt?: string }> = ({
    className = 'w-10 h-10 object-contain',
    alt = 'Rendimiento'
}) => (
    <img src="/icons/percentage-roi.png" className={className} alt={alt} />
);