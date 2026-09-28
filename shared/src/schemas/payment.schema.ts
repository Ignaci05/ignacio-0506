import { z } from 'zod';

export const PaymentRequestSchema = z.object({
  cardNumber: z
    .string()
    .min(1, 'El número de tarjeta es requerido')
    .regex(/^\d{13,19}$/, 'El número de tarjeta debe contener entre 13 y 19 dígitos numéricos'),
  expirationDate: z
    .string()
    .min(1, 'La fecha de vencimiento es requerida')
    .regex(/^(0[1-9]|1[0-2])\/(\d{2})$/, 'El formato debe ser MM/YY (ej. 12/26)'),
  cvv: z
    .string()
    .min(1, 'El CVV es requerido')
    .regex(/^\d{3,4}$/, 'El CVV debe contener 3 o 4 dígitos numéricos'),
  fullName: z
    .string()
    .trim()
    .min(2, 'El nombre completo debe tener al menos 2 caracteres'),
  amount: z
    .number({ invalid_type_error: 'El monto debe ser un número válido' })
    .positive('El monto debe ser mayor que cero')
    .max(100000, 'El monto máximo por recarga es $100,000'),
  payer_id: z
    .string()
    .min(1, 'El identificador del pagador es requerido'),
  payer_email: z
    .string()
    .email('El correo electrónico del pagador no es válido'),
});

export type PaymentRequestSchemaType = z.infer<typeof PaymentRequestSchema>;
