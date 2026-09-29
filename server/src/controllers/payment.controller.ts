import { Request, Response } from 'express';
import { SnailPayService } from '../services/snailpay.service';
import { SnailPayPaymentRequest } from '@app/shared';
import crypto from 'node:crypto';

export class PaymentController {
    private readonly snailPayService: SnailPayService;

    constructor() {
        this.snailPayService = new SnailPayService();
    }

    //Endpoint: POST /api/snailpay/charge
    public charge = async (req: Request, res: Response): Promise<void> => {
        try {
            const paymentRequest: SnailPayPaymentRequest = req.body;
            const paymentResponse = this.snailPayService.processPayment(paymentRequest);

            //Si es aprobado o rechazado se retorna 200 con el detalle de la transacción

            res.status(200).json(paymentResponse);
        } catch (error: any) {
            //Si es error de sistema o excepción no controlada
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({
                id: crypto.randomUUID(),
                status: 'error',
                status_detail: error.statusDetail || 'error_system_failure',
                message: error.message || 'Error al procesar el pago',
                date_created: new Date().toISOString(),
            });
        }
    };
}