import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentRequestSchema, PaymentRequestSchemaType, SnailPayPaymentResponse } from '@app/shared';
import { useAuth } from '../../context/AuthContext';
import { WalletService } from '../../services/wallet.service';
import { Modal, Button, Input } from '../ui';
import { CreditCardColorIcon, ApprovedBadgeIcon, RejectedBadgeIcon, WarningBadgeIcon } from '../icons';

interface SnailPayModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRechargeComplete: () => void;
}

export const SnailPayModal: React.FC<SnailPayModalProps> = ({
    isOpen,
    onClose,
    onRechargeComplete,
}) => {
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [result, setResult] = useState<SnailPayPaymentResponse | null>(null);
    const [systemError, setSystemError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<PaymentRequestSchemaType>({
        resolver: zodResolver(PaymentRequestSchema),
        defaultValues: {
            cardNumber: '1234123412341234',
            expirationDate: '12/26',
            cvv: '543',
            fullName: user?.fullName || 'Alejandro Ramos',
            amount: 100,
            payer_id: user?.id || 'usr-001',
            payer_email: user?.email || 'user@test.com',
        },
    });

    // Presets rápidos para facilitar la evaluación
    const applyPreset = (type: 'success' | 'rejected' | 'server_error') => {
        setResult(null);
        setSystemError(null);
        setValue('fullName', user?.fullName || 'Alejandro Ramos');
        setValue('payer_id', user?.id || 'usr-001');
        setValue('payer_email', user?.email || 'user@test.com');
        setValue('amount', 100);

        if (type === 'success') {
            setValue('cardNumber', '1234123412341234');
            setValue('expirationDate', '12/26');
            setValue('cvv', '543');
        } else if (type === 'rejected') {
            setValue('cardNumber', '1234123412341234');
            setValue('expirationDate', '12/26');
            setValue('cvv', '999'); // CVV incorrecto para provocar rechazo
        } else if (type === 'server_error') {
            setValue('cardNumber', '4000123456789999'); // Termina en 9999 -> Error 500
            setValue('expirationDate', '12/26');
            setValue('cvv', '543');
        }
    };

    const onSubmit = async (formData: PaymentRequestSchemaType) => {
        setIsProcessing(true);
        setResult(null);
        setSystemError(null);

        try {
            const response = await WalletService.processRecharge(formData);
            setResult(response);
            if (response.status === 'approved') {
                onRechargeComplete();
            }
        } catch (err: any) {
            setSystemError(err.message || 'Error de conexión con el servicio SnailPay');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleClose = () => {
        setResult(null);
        setSystemError(null);
        reset();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Cargar Saldo con SnailPay"
            subtitle="Pasarela de pagos y procesamiento transaccional seguro"
            maxWidth="max-w-xl"
        >
            <div className="space-y-6">

                {/* Presets Rápidos para Pruebas Automatizadas */}
                <div className="p-3.5 bg-[#051424] border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        <span>Tarjetas de Prueba Rápida:</span>
                        <span className="text-emerald-400 font-mono">Auto-Fill</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <button
                            type="button"
                            onClick={() => applyPreset('success')}
                            className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-left font-medium transition"
                        >
                            <div className="font-bold">Transacción Aprobada</div>
                            <div className="text-[10px] text-emerald-400/80 font-mono">200 OK / $100.00</div>
                        </button>
                        <button
                            type="button"
                            onClick={() => applyPreset('rejected')}
                            className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-left font-medium transition"
                        >
                            <div className="font-bold">Tarjeta Rechazada</div>
                            <div className="text-[10px] text-rose-400/80 font-mono">CVV Inválido</div>
                        </button>
                        <button
                            type="button"
                            onClick={() => applyPreset('server_error')}
                            className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-left font-medium transition"
                        >
                            <div className="font-bold">Fallo de Pasarela</div>
                            <div className="text-[10px] text-amber-400/80 font-mono">Error 500</div>
                        </button>
                    </div>
                </div>

                {/* FEEDBACK 1: COBRO EXITOSO */}
                {result && result.status === 'approved' && (
                    <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3 animate-fadeIn">
                        <ApprovedBadgeIcon className="w-12 h-12 mx-auto" />
                        <h4 className="text-lg font-bold text-emerald-400">¡Recarga Aprobada Exitosamente!</h4>
                        <p className="text-xs text-slate-300">
                            Se han acreditado <strong className="text-white font-mono">${result.transaction_amount.toFixed(2)} USD</strong> a tu billetera.
                        </p>
                        <div className="p-3 bg-[#051424] rounded-xl border border-slate-800 text-left text-xs font-mono space-y-1 text-slate-300">
                            <div>ID Operación: <span className="text-white">{result.id}</span></div>
                            <div>Autorización: <span className="text-emerald-400">{result.authorization_code}</span></div>
                            <div>Referencia: <span className="text-white">{result.reference}</span></div>
                        </div>
                        <Button variant="success" size="sm" onClick={handleClose} className="w-full mt-2">
                            Aceptar y Ver Saldo
                        </Button>
                    </div>
                )}

                {/* FEEDBACK 2: RECHAZO DE NEGOCIO */}
                {result && result.status === 'rejected' && (
                    <div className="p-5 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-center space-y-3 animate-fadeIn">
                        <RejectedBadgeIcon className="w-12 h-12 mx-auto" />
                        <h4 className="text-lg font-bold text-rose-400">Transacción Rechazada</h4>
                        <p className="text-xs text-slate-300">
                            La pasarela no pudo autorizar el cobro. El saldo no ha sido modificado.
                        </p>
                        <div className="p-3 bg-[#051424] rounded-xl border border-slate-800 text-left text-xs font-mono space-y-1 text-slate-300">
                            <div>Motivo: <span className="text-rose-400 font-bold">{result.status_detail}</span></div>
                            <div>ID Operación: <span className="text-slate-400">{result.id}</span></div>
                        </div>
                        <Button variant="secondary" size="sm" onClick={() => setResult(null)} className="w-full mt-2">
                            Modificar Datos y Reintentar
                        </Button>
                    </div>
                )}

                {/* FEEDBACK 3: ERROR DE SISTEMA 500 */}
                {((result && result.status === 'error') || systemError) && (
                    <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-center space-y-3 animate-fadeIn">
                        <WarningBadgeIcon className="w-12 h-12 mx-auto" />
                        <h4 className="text-lg font-bold text-amber-400">Fallo Interno en SnailPay (Error 500)</h4>
                        <p className="text-xs text-slate-300">
                            {systemError || 'El servicio de la pasarela no pudo responder a tiempo. Ningún cobro fue aplicado.'}
                        </p>
                        <Button variant="secondary" size="sm" onClick={() => { setResult(null); setSystemError(null); }} className="w-full mt-2">
                            Reintentar Operación
                        </Button>
                    </div>
                )}

                {/* FORMULARIO DE RECARGA */}
                {!result && !systemError && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Monto de Recarga con Botones Rápidos */}
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Monto de la Recarga (USD)
                            </label>
                            <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                                {[50, 100, 250, 500].map((amt) => (
                                    <button
                                        key={amt}
                                        type="button"
                                        onClick={() => setValue('amount', amt)}
                                        className="py-2 rounded-xl bg-[#051424] hover:bg-[#1c2b3c] text-white border border-slate-700 hover:border-indigo-500 font-bold transition"
                                    >
                                        ${amt}
                                    </button>
                                ))}
                            </div>
                            <Input
                                type="number"
                                step="any"
                                placeholder="Monto personalizado"
                                error={errors.amount?.message}
                                {...register('amount', { valueAsNumber: true })}
                            />
                        </div>

                        {/* Número de Tarjeta */}
                        <Input
                            label="Número de Tarjeta"
                            placeholder="1234123412341234"
                            maxLength={19}
                            error={errors.cardNumber?.message}
                            {...register('cardNumber')}
                        />

                        {/* Fecha de Vencimiento y CVV */}
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Vencimiento (MM/YY)"
                                placeholder="12/26"
                                maxLength={5}
                                error={errors.expirationDate?.message}
                                {...register('expirationDate')}
                            />
                            <Input
                                label="CVV"
                                placeholder="543"
                                maxLength={4}
                                error={errors.cvv?.message}
                                {...register('cvv')}
                            />
                        </div>

                        {/* Nombre del Titular */}
                        <Input
                            label="Nombre del Titular"
                            placeholder="Alejandro Ramos"
                            error={errors.fullName?.message}
                            {...register('fullName')}
                        />

                        {/* Botones de Acción */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                            <Button type="button" variant="outline" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="success"
                                isLoading={isProcessing}
                                leftIcon={<CreditCardColorIcon className="w-5 h-5" />}
                            >
                                Pagar y Recargar
                            </Button>
                        </div>
                    </form>
                )}

            </div>
        </Modal>
    );
};