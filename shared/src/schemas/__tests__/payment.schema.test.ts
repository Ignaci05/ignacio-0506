import { describe, it, expect } from 'vitest';
import { PaymentRequestSchema } from '../payment.schema';

describe('PaymentRequestSchema (Zod Validation)', () => {
  const validPayload = {
    cardNumber: '1234123412341234',
    expirationDate: '12/26',
    cvv: '543',
    fullName: 'Juan Pérez',
    amount: 150.5,
    payer_id: 'usr-12345',
    payer_email: 'juan@example.com',
  };

  it('debe validar exitosamente un payload correcto de SnailPay', () => {
    const result = PaymentRequestSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('debe fallar si el número de tarjeta contiene letras o tamaño incorrecto', () => {
    const result = PaymentRequestSchema.safeParse({
      ...validPayload,
      cardNumber: '1234ABCD12345678',
    });
    expect(result.success).toBe(false);
  });

  it('debe fallar si el formato de expiración no es MM/YY válido', () => {
    const result = PaymentRequestSchema.safeParse({
      ...validPayload,
      expirationDate: '13/26', // Mes 13 inválido
    });
    expect(result.success).toBe(false);
  });

  it('debe fallar si el CVV no tiene 3 o 4 dígitos', () => {
    const result = PaymentRequestSchema.safeParse({
      ...validPayload,
      cvv: '12',
    });
    expect(result.success).toBe(false);
  });

  it('debe fallar si el monto es menor o igual a cero', () => {
    const resultZero = PaymentRequestSchema.safeParse({
      ...validPayload,
      amount: 0,
    });
    expect(resultZero.success).toBe(false);

    const resultNegative = PaymentRequestSchema.safeParse({
      ...validPayload,
      amount: -50,
    });
    expect(resultNegative.success).toBe(false);
  });

  it('debe fallar si el correo del pagador no tiene formato válido', () => {
    const result = PaymentRequestSchema.safeParse({
      ...validPayload,
      payer_email: 'correo-invalido',
    });
    expect(result.success).toBe(false);
  });
});
