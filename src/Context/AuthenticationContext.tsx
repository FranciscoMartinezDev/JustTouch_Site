import { AuthResponse } from '@/Models/Auth/AuthResponse';
import { ContextChildren } from '@/Models/Interfaces/ContextChildren';
import { IAuthContext } from '@/Models/Interfaces/IAuthContext';
import { User } from '@/Models/User';
import { JustTouchClient } from '@/Services/Client';
import { message } from 'antd';
import { createContext, FC, useContext, useState } from 'react';
import cookie from 'js-cookie';

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
    const [user, setUser] = useState<User>(new User());
    const service = JustTouchClient.getInstance();

    const handleUser = <K extends keyof User>(key: K, value: any) => setUser(prev => ({ ...prev, [key]: value }));

    const DetectBranch = (value: boolean) => setBranchSelector(value);

    const RequestService = async () => {
        setRequesting(true);
        var response = await service.Post<User, boolean>('account', 'Register', user);
        if (response.success) {
            setRequesting(false);
            setServiceRequested(true);
            return;
        }
        message.error(response.error);
        setRequesting(false);
    }

    const ConfirmAccount = async (email: string) => {
        var userData = new User({ email: email });
        const response = await service.Post<User, AuthResponse>('account', 'ConfirmEmail', userData);
        if (response.success) {
            const session = response.data?.session;
            if (session) {
                cookie.set('JToken', session.accessToken!, {
                    expires: session?.expiresAt
                })
            }
            return;
        }
        message.error(response.error);
        return;
    }

    return (
        <AutheticationContext.Provider value={{
            user, handleUser,
            requesting,
            serviceRequested, branchSelector,
            ConfirmAccount, RequestService, DetectBranch
        }}>
            {children}
        </AutheticationContext.Provider>
    )
}