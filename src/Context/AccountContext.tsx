import { Account } from '@/Models/Account';
import { ContextChildren } from '@/Models/Interfaces/ContextChildren';
import { IAccountContext } from '@/Models/Interfaces/IAccountContext';
import { User } from '@/Models/User';
import { createContext, FC, useContext, useState } from 'react';

const AccountContext = createContext<IAccountContext | undefined>(undefined);


export const useAccountContext = (): IAccountContext => {
    const context = useContext(AccountContext);
    if (!context) throw new Error('account context not provided!');
    return context;
}

export const AccountProvider: FC<ContextChildren> = ({ children }) => {
    const [account, setAccount] = useState<Account>(new Account({ userData: new User() }));
    const [openFranchise, setOpenFranchise] = useState<boolean>(false);
    const [selectedFranchise, setSelectedFranchise] = useState<number | undefined>(undefined);
    const handler = (callback: (prev: Account) => Account) => setAccount(callback);

    const OpenFranchise = (index?: number) => {
        setSelectedFranchise(index);
        setOpenFranchise(!openFranchise);
    }

    return (
        <AccountContext.Provider value={{ account, handler, openFranchise, selectedFranchise, OpenFranchise }}>
            {children}
        </AccountContext.Provider>
    )
}