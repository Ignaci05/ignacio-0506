import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

// Middleware para validar esquema Zod en req.body usando safeParse
export const validateBody = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);

        // Si la validación falla, retornamos 400 Bad Request inmediatamente
        if (!result.success) {
            res.status(400).json({
                status: 'error',
                message: 'Error de validación en los datos enviados',
                errors: result.error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                })),
            });
            return;
        }

        // Si los datos son válidos, asignamos los datos saneados y continuamos
        req.body = result.data;
        next();
    };
};