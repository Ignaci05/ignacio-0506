/**
 * Tipos para el módulo de Usuarios, Autenticación y Billetera
 */

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export interface UserStorageData {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string; // Hash con sal para proteger la contraseña en LocalStorage
  passwordSalt: string;
  createdAt: string;
}

export interface UserSession {
  token: string;
  user: UserProfile;
  expiresAt: number;
}

export interface WalletState {
  balance: number;
  lastUpdated: string;
}

export interface StoredPaymentData {
  lastCardNumber: string;
  lastCvv: string;
  lastUsedAt: string;
}
