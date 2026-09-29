import { describe, it, expect, beforeEach } from 'vitest';
import { SnailPayService } from '../snailpay.service';
import { SnailPayPaymentRequest } from '@app/shared';

describe('SnailPayService - Lógica de Negocio y Escenarios', () => {
  let service: SnailPayService;

  beforeEach(() => {
    service = new SnailPayService();
  });

  const baseValidPayload: SnailPayPaymentRequest = {
    cardNumber: '1234123412341234',
    expirationDate: '12/26',
    cvv: '543',
    fullName: 'Alejandro Ramos',
    amount: 100,
    payer_id: 'usr-8492',
    payer_email: 'alejandro@test.com',
  };

  it('Escenario 1: debe procesar un cobro exitoso con los datos válidos del PDF', () => {
    const result = service.processPayment(baseValidPayload);

    expect(result.status).toBe('approved');
    expect(result.status_detail).toBe('approved_successful');
    expect(result.transaction_amount).toBe(100);
    expect(result.authorization_code).toMatch(/^AUTH-[A-F0-9]{8}$/);
    expect(result.card_number).toBe('1234123412341234');
    expect(result.cvv).toBe('543');
    expect(result.id).toBeDefined();
    expect(result.reference).toMatch(/^REF-SNAIL-/);
  });

  it('Escenario 2A: debe rechazar la transacción si el CVV no coincide', () => {
    const result = service.processPayment({
      ...baseValidPayload,
      cvv: '999',
    });

    expect(result.status).toBe('rejected');
    expect(result.status_detail).toBe('rejected_invalid_cvv');
    expect(result.authorization_code).toBeNull();
  });

  it('Escenario 2B: debe rechazar la transacción si la tarjeta está vencida', () => {
    const result = service.processPayment({
      ...baseValidPayload,
      expirationDate: '01/20', 
    });

    expect(result.status).toBe('rejected');
    expect(result.status_detail).toBe('rejected_expired_card');
    expect(result.authorization_code).toBeNull();
  });

  it('Escenario 2C: debe rechazar la transacción por fondos insuficientes en tarjetas no autorizadas', () => {
    const result = service.processPayment({
      ...baseValidPayload,
      cardNumber: '5555444433332222',
    });

    expect(result.status).toBe('rejected');
    expect(result.status_detail).toBe('rejected_insufficient_funds');
    expect(result.authorization_code).toBeNull();
  });

  it('Escenario 3: debe simular error de sistema (500 / Timeout) si la tarjeta termina en 9999', () => {
    expect(() => {
      service.processPayment({
        ...baseValidPayload,
        cardNumber: '1111222233339999',
      });
    }).toThrowError(/SnailPay Gateway Timeout/);
  });
});