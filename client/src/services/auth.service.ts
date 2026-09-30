import {
    UserProfile,
    UserStorageData,
    UserSession,
    WalletState,
    RegisterSchemaType,
    LoginSchemaType
} from '@app/shared';

const USERS_STORAGE_KEY = 'snailbet_users_db';
const SESSION_STORAGE_KEY = 'snailbet_active_session';
const WALLET_STORAGE_KEY_PREFIX = 'snailbet_wallet_';

export class AuthService {

    // Función para generar un Hash SHA-256 seguro con sal usando la Web Crypto API nativa
    private static async hashPassword(password: string, salt: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(password + salt);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }

    // Genera una sal aleatoria criptográfica
    private static generateSalt(): string {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
    }

    // Obtiene la lista de usuarios registrados en LocalStorage
    private static getUsers(): UserStorageData[] {
        const data = localStorage.getItem(USERS_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    // Registra un nuevo usuario
    public static async register(formData: RegisterSchemaType): Promise<UserSession> {
        const users = this.getUsers();

        // Validar si el correo ya existe
        const existing = users.some((u) => u.email.toLowerCase() === formData.email.toLowerCase());
        if (existing) {
            throw new Error('Ya existe una cuenta registrada con este correo electrónico.');
        }

        // Hashing seguro de contraseña
        const salt = this.generateSalt();
        const passwordHash = await this.hashPassword(formData.password, salt);
        const userId = `usr-${Date.now().toString().slice(-6)}`;

        const newUser: UserStorageData = {
            id: userId,
            fullName: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            passwordHash,
            passwordSalt: salt,
            createdAt: new Date().toISOString(),
        };

        // Guardar usuario en LocalStorage
        users.push(newUser);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

        // Inicializar saldo en $0.00 como requiere el PDF
        const initialWallet: WalletState = {
            balance: 0.0,
            lastUpdated: new Date().toISOString(),
        };
        localStorage.setItem(`${WALLET_STORAGE_KEY_PREFIX}${userId}`, JSON.stringify(initialWallet));

        // Iniciar sesión automáticamente
        return this.createSession(newUser);
    }

    // Iniciar sesión
    public static async login(credentials: LoginSchemaType): Promise<UserSession> {
        const users = this.getUsers();
        const user = users.find((u) => u.email.toLowerCase() === credentials.email.toLowerCase());

        if (!user) {
            throw new Error('Credenciales inválidas. Verifica tu correo y contraseña.');
        }

        // Verificar hash de contraseña
        const testHash = await this.hashPassword(credentials.password, user.passwordSalt);
        if (testHash !== user.passwordHash) {
            throw new Error('Credenciales inválidas. Verifica tu correo y contraseña.');
        }

        return this.createSession(user);
    }

    // Crea y guarda la sesión activa en LocalStorage usando UUID criptográfico
    private static createSession(user: UserStorageData | UserProfile): UserSession {
        const profile: UserProfile = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            createdAt: user.createdAt,
        };

        const session: UserSession = {
            token: `token-${crypto.randomUUID()}`, // 👈 Criptográficamente seguro (CSPRNG)
            user: profile,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 horas
        };

        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
        return session;
    }

    // Obtiene la sesión actual si está activa
    public static getCurrentSession(): UserSession | null {
        const data = localStorage.getItem(SESSION_STORAGE_KEY);
        if (!data) return null;

        try {
            const session: UserSession = JSON.parse(data);
            if (Date.now() > session.expiresAt) {
                this.logout();
                return null;
            }
            return session;
        } catch {
            this.logout();
            return null;
        }
    }

    // Cierra la sesión activa
    public static logout(): void {
        localStorage.removeItem(SESSION_STORAGE_KEY);
    }
}