import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = '', id, ...props }, ref) => {
        const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label htmlFor={inputId} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        {label}
                    </label>
                )}
                <input
                    id={inputId}
                    ref={ref}
                    className={`w-full px-3.5 py-2.5 bg-[#051424] border rounded-xl text-white text-sm transition-colors placeholder:text-slate-500 focus:outline-none ${error
                            ? 'border-rose-500/80 focus:border-rose-400 bg-rose-950/10'
                            : 'border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30'
                        } ${className}`}
                    {...props}
                />
                {error && (
                    <span className="text-rose-400 text-xs font-medium block animate-fadeIn">
                        {error}
                    </span>
                )}
                {helperText && !error && (
                    <span className="text-slate-400 text-[11px] block">
                        {helperText}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';