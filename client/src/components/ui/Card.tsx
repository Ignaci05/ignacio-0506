import React, { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => (
    <div className={`bg-[#0d1c2d] border border-slate-800/90 rounded-2xl shadow-xl ${className}`} {...props}>
        {children}
    </div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className = '', ...props }) => (
    <div className={`p-6 border-b border-slate-800/60 ${className}`} {...props}>
        {children}
    </div>
);

export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
    <h3 className={`text-xl font-bold text-white tracking-tight ${className}`} {...props}>
        {children}
    </h3>
);

export const CardContent: React.FC<CardProps> = ({ children, className = '', ...props }) => (
    <div className={`p-6 ${className}`} {...props}>
        {children}
    </div>
);