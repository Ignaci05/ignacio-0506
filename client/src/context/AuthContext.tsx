import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { UserProfile, UserSession, RegisterSchemaType, LoginSchemaType } from '@app/shared';
import { AuthService } from '../services/auth.service';

interface AuthContextType {
    user: UserProfile | null;
    session: UserSession | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginSchemaType) => Promise<void>;
    register: (data: RegisterSchemaType) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<UserSession | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Restaurar sesión activa de LocalStorage al iniciar o recargar la página
    useEffect(() => {
        const activeSession = AuthService.getCurrentSession();
        if (activeSession) {
            setSession(activeSession);
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (credentials: LoginSchemaType): Promise<void> => {
        const newSession = await AuthService.login(credentials);
        setSession(newSession);
    }, []);

    const register = useCallback(async (data: RegisterSchemaType): Promise<void> => {
        const newSession = await AuthService.register(data);
        setSession(newSession);
    }, []);

    const logout = useCallback((): void => {
        AuthService.logout();
        setSession(null);
    }, []);

    // Memoizar el objeto value para optimizar re-renders
    const contextValue = useMemo<AuthContextType>(() => ({
        user: session ? session.user : null,
        session,
        isAuthenticated: !!session,
        isLoading,
        login,
        register,
        logout,
    }), [session, isLoading, login, register, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe utilizarse dentro de un AuthProvider');
    }
    return context;
};