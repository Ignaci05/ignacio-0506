import { describe, it, expect } from 'vitest';
import { RegisterSchema, LoginSchema } from '../auth.schema';

describe('Auth Schemas (Zod Validation)', () => {
  describe('RegisterSchema', () => {
    it('debe validar exitosamente un registro con contraseñas coincidentes', () => {
      const valid = {
        fullName: 'Ignacio Developer',
        email: 'ignacio@test.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };
      const result = RegisterSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('debe fallar si las contraseñas no coinciden', () => {
      const invalid = {
        fullName: 'Ignacio Developer',
        email: 'ignacio@test.com',
        password: 'Password123!',
        confirmPassword: 'DifferentPassword!',
      };
      const result = RegisterSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Las contraseñas no coinciden');
      }
    });

    it('debe fallar si la contraseña tiene menos de 6 caracteres', () => {
      const invalid = {
        fullName: 'Ignacio Developer',
        email: 'ignacio@test.com',
        password: '123',
        confirmPassword: '123',
      };
      const result = RegisterSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('LoginSchema', () => {
    it('debe validar un login con email y password correctos', () => {
      const valid = {
        email: 'user@test.com',
        password: 'SecretPassword',
      };
      const result = LoginSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('debe fallar si el email no es válido', () => {
      const invalid = {
        email: 'no-es-un-email',
        password: 'SecretPassword',
      };
      const result = LoginSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });
});
