import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";
import { validateBody } from "../middlewares/validate.middlewares";
import { PaymentRequestSchema } from "@app/shared";

const router = Router();
const paymentController = new PaymentController;

//Ruta para procesar recargas simuladas
router.post('/charge', validateBody(PaymentRequestSchema), paymentController.charge);

export default router;