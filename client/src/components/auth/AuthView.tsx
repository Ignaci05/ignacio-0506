import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    RegisterSchema,
    RegisterSchemaType,
    LoginSchema,
    LoginSchemaType
} from '@app/shared';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Card } from '../ui';
import { SnailLogoIcon } from '../icons';

export const AuthView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [authError, setAuthError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { login, register: registerUser } = useAuth();

    // Formulario de Inicio de Sesión
    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { email: '', password: '' },
    });

    // Formulario de Registro
    const {
        register: registerSignup,
        handleSubmit: handleRegisterSubmit,
        formState: { errors: registerErrors },
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: { fullName: '', email: '', password: '', confirmPassword: '' },
    });

    const onLoginSubmit = async (data: LoginSchemaType) => {
        setAuthError(null);
        setIsSubmitting(true);
        try {
            await login(data);
        } catch (err: any) {
            setAuthError(err.message || 'Error al iniciar sesión');
        } finally {
            setIsSubmitting(false);
        }
    };

    const onRegisterSubmit = async (data: RegisterSchemaType) => {
        setAuthError(null);
        setIsSubmitting(true);
        try {
            await registerUser(data);
        } catch (err: any) {
            setAuthError(err.message || 'Error al registrar usuario');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#051424] px-4 py-12">
            <Card className="w-full max-w-md p-8 space-y-6">

                {/* Header con marca */}
                <div className="text-center space-y-3">
                    <div className="flex justify-center">
                        <SnailLogoIcon className="w-16 h-16 object-contain drop-shadow-lg" />
                    </div>
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                                En Vivo
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight uppercase">SnailBet</h1>
                        <p className="text-xs text-slate-400">Carreras de Caracoles y Apuestas Deportivas</p>
                    </div>
                </div>

                {/* Pestañas de Navegación */}
                <div className="grid grid-cols-2 bg-[#051424] p-1 rounded-xl border border-slate-800">
                    <button
                        type="button"
                        onClick={() => { setActiveTab('login'); setAuthError(null); }}
                        className={`py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'login'
                                ? 'bg-[#1c2b3c] text-white shadow-sm border border-slate-700'
                                : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        type="button"
                        onClick={() => { setActiveTab('register'); setAuthError(null); }}
                        className={`py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'register'
                                ? 'bg-[#1c2b3c] text-white shadow-sm border border-slate-700'
                                : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        Registro de Usuario
                    </button>
                </div>

                {/* Alerta de Error General */}
                {authError && (
                    <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-medium animate-fadeIn">
                        {authError}
                    </div>
                )}

                {/* FORMULARIO 1: INICIAR SESIÓN */}
                {activeTab === 'login' && (
                    <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
                        <Input
                            label="Correo Electrónico"
                            type="email"
                            placeholder="ejemplo@correo.com"
                            error={loginErrors.email?.message}
                            {...registerLogin('email')}
                        />

                        <Input
                            label="Contraseña"
                            type="password"
                            placeholder="••••••••"
                            error={loginErrors.password?.message}
                            {...registerLogin('password')}
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            isLoading={isSubmitting}
                            className="w-full mt-2"
                        >
                            Ingresar a la Plataforma
                        </Button>
                    </form>
                )}

                {/* FORMULARIO 2: REGISTRO DE USUARIO */}
                {activeTab === 'register' && (
                    <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="space-y-4">
                        <Input
                            label="Nombre Completo"
                            type="text"
                            placeholder="Juan Pérez"
                            error={registerErrors.fullName?.message}
                            {...registerSignup('fullName')}
                        />

                        <Input
                            label="Correo Electrónico"
                            type="email"
                            placeholder="juan@correo.com"
                            error={registerErrors.email?.message}
                            {...registerSignup('email')}
                        />

                        <Input
                            label="Contraseña"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            error={registerErrors.password?.message}
                            {...registerSignup('password')}
                        />

                        <Input
                            label="Confirmar Contraseña"
                            type="password"
                            placeholder="Repite tu contraseña"
                            error={registerErrors.confirmPassword?.message}
                            {...registerSignup('confirmPassword')}
                        />

                        <Button
                            type="submit"
                            variant="success"
                            size="lg"
                            isLoading={isSubmitting}
                            className="w-full mt-2"
                        >
                            Crear Cuenta y Comenzar
                        </Button>
                    </form>
                )}

            </Card>
        </div>
    );
};