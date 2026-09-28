import { z } from 'zod';

export const RegisterSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, 'El nombre completo debe contener al menos 2 caracteres')
      .max(100, 'El nombre es demasiado largo'),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email('Ingresa un correo electrónico válido'),
    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(100, 'La contraseña es demasiado larga'),
    confirmPassword: z
      .string()
      .min(1, 'Debes confirmar tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Ingresa un correo electrónico válido'),
  password: z
    .string()
    .min(1, 'Ingresa tu contraseña'),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
