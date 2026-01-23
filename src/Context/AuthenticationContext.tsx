import { ContextChildren } from '@/Models/Interfaces/ContextChildren';
import { IAuthContext } from '@/Models/Interfaces/IAuthContext';
import { createContext, FC, useContext, useState } from 'react';

const AutheticationContext = createContext<IAuthContext | undefined>(undefined);

export const useAuthenticationContext = (): IAuthContext => {
    const context = useContext(AutheticationContext);
    if (!context) throw new Error('Auth context not provided!');
    return context;
}

export const AutheticationProvider: FC<ContextChildren> = ({ children }) => {
    const [branchSelector, setBranchSelector] = useState<boolean>(false);
    const [serviceRequested, setServiceRequested] = useState<boolean>(false);
    const [requesting, setRequesting] = useState<boolean>(false);

    const DetectBranch = (value: boolean) => setBranchSelector(value);

    const RequestService = () => {
        setRequesting(true);
        setTimeout(() => {
            setRequesting(false);
            setServiceRequested(true);
        }, 3000);
    }

    return (
        <AutheticationContext.Provider value={{
            requesting,
            serviceRequested, branchSelector,
            RequestService, DetectBranch
        }}>
            {children}
        </AutheticationContext.Provider>
    )
}