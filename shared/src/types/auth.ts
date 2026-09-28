//Tipos para el módulo de Usuarios, Autenticación y Billetera


//Datos para usuario
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

//Datos a guardar de un usuario
export interface UserStorageData {
  id: string;
  fullName: string;
  email: string;
// Hash con sal para proteger la contraseña en LocalStorage
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
}


//Almacenamiento de sesión por usuario
export interface UserSession {
  token: string;
  user: UserProfile;
  expiresAt: number;
}

//Estado de Wallet
export interface WalletState {
  balance: number;
  lastUpdated: string;
}

//Guardado de método de pago
export interface StoredPaymentData {
  lastCardNumber: string;
  lastCvv: string;
  lastUsedAt: string;
}
