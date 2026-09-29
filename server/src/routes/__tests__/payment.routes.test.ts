import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../../app';

describe('Payment API Endpoints - POST /api/snailpay/charge', () => {
    const app = createApp();

    const validPaymentPayload = {
        cardNumber: '1234123412341234',
        expirationDate: '12/26',
        cvv: '543',
        fullName: 'Alejandro Ramos',
        amount: 150.0,
        payer_id: 'usr-001',
        payer_email: 'alejandro@test.com',
    };

    it('debe responder 200 OK con estado "approved" para un cobro exitoso', async () => {
        const response = await request(app)
            .post('/api/snailpay/charge')
            .send(validPaymentPayload);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.status).toBe('approved');
        expect(response.body.status_detail).toBe('approved_successful');
        expect(response.body.transaction_amount).toBe(150.0);
        expect(response.body.authorization_code).toMatch(/^AUTH-/);
        expect(response.body.card_number).toBe('1234123412341234');
        expect(response.body.cvv).toBe('543');
    });

    it('debe responder 200 OK con estado "rejected" si el CVV no coincide', async () => {
        const response = await request(app)
            .post('/api/snailpay/charge')
            .send({
                ...validPaymentPayload,
                cvv: '999',
            });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('rejected');
        expect(response.body.status_detail).toBe('rejected_invalid_cvv');
        expect(response.body.authorization_code).toBeNull();
    });

    it('debe responder 400 Bad Request si los datos no cumplen con el esquema Zod (ej. monto negativo)', async () => {
        const response = await request(app)
            .post('/api/snailpay/charge')
            .send({
                ...validPaymentPayload,
                amount: -50, // Monto inválido
            });

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body).toHaveProperty('errors');
    });

    it('debe responder 500 Internal Server Error cuando la tarjeta termina en 9999 (Error de sistema simulado)', async () => {
        const response = await request(app)
            .post('/api/snailpay/charge')
            .send({
                ...validPaymentPayload,
                cardNumber: '4000123456789999',
            });

        expect(response.status).toBe(500);
        expect(response.body.status).toBe('error');
        expect(response.body.status_detail).toBe('error_system_failure');
    });
});