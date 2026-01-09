import { ContextChildren } from '@/Models/Interfaces/ContextChildren';
import { IAuthContext } from '@/Models/Interfaces/IAuthContext';
import { createContext, FC, useContext } from 'react';

const AutheticationContext = createContext<IAuthContext | undefined>(undefined);

export const useAuthenticationContext = (): IAuthContext => {
    const context = useContext(AutheticationContext);
    if (!context) throw new Error('Auth context not provided!');
    return context;
}

export const AutheticationProvider: FC<ContextChildren> = ({ children }) => {
    

    return (
        <AutheticationContext.Provider value={{}}>
            {children}
        </AutheticationContext.Provider>
    )
}