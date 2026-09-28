/**
 * Tipos y enumeraciones para la pasarela de pagos simulada (SnailPay)
 */

export type TransactionStatus = 'approved' | 'rejected' | 'error';

export type TransactionStatusDetail =
  | 'approved_successful'
  | 'rejected_invalid_card'
  | 'rejected_expired_card'
  | 'rejected_invalid_cvv'
  | 'rejected_insufficient_funds'
  | 'rejected_card_blocked'
  | 'rejected_invalid_amount'
  | 'error_system_failure'
  | 'error_timeout';

export interface SnailPayPaymentRequest {
  cardNumber: string;
  expirationDate: string; // MM/YY
  cvv: string;
  fullName: string;
  amount: number;
  payer_id: string;
  payer_email: string;
}

export interface SnailPayPaymentResponse {
  id: string;
  status: TransactionStatus;
  status_detail: string;
  transaction_amount: number;
  date_created: string; // ISO 8601
  authorization_code: string | null;
  reference: string;
  payer_id: string;
  payer_email: string;
  card_number: string;
  cvv: string;
}

export interface PaymentSimulationScenario {
  name: string;
  description: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  amount: number;
  expectedStatus: TransactionStatus;
  expectedDetail: TransactionStatusDetail;
}
