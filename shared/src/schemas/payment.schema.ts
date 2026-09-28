//Validación y tests usando zod, validando los datos al tiempo de ejecución
import { z } from 'zod';

//Validación para los datos de pago
export const PaymentRequestSchema = z.object({
  //Valida que la tarjeta tenga entre 13 y 19 dígitos números usando REGEX
  cardNumber: z
    .string()
    .min(1, 'El número de tarjeta es requerido')
    .regex(/^\d{13,19}$/, 'El número de tarjeta debe contener entre 13 y 19 dígitos numéricos'),
  //Valida que la fecha esté en formato MM/YY y que el mes esté entre 01 y 12
    expirationDate: z
    .string()
    .min(1, 'La fecha de vencimiento es requerida')
    .regex(/^(0[1-9]|1[0-2])\/(\d{2})$/, 'El formato debe ser MM/YY (ej. 12/26)'),
  //Validación de cvv a 3 o 4 dígitos
  cvv: z
    .string()
    .min(1, 'El CVV es requerido')
    .regex(/^\d{3,4}$/, 'El CVV debe contener 3 o 4 dígitos numéricos'),
  //Valida que el nombre no esté vacio, conteniendo mínimo 2 caracteres
  fullName: z
    .string()
    .trim()
    .min(2, 'El nombre completo debe tener al menos 2 caracteres'),
  //Valida que el monto sea un número positivo mayor a 0
    amount: z
    .number({ invalid_type_error: 'El monto debe ser un número válido' })
    .positive('El monto debe ser mayor que cero')
    .max(100000, 'El monto máximo por recarga es $100,000'),
  //Validación para el identificador de pago
  payer_id: z
    .string()
    .min(1, 'El identificador del pagador es requerido'),
  //Validación para el formato de email
    payer_email: z
    .string()
    .email('El correo electrónico del pagador no es válido'),
});

export type PaymentRequestSchemaType = z.infer<typeof PaymentRequestSchema>;
