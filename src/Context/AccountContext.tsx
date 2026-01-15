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
    const [openSocial, setOpenSocial] = useState<boolean>(false);
    const [selectedFranchise, setSelectedFranchise] = useState<number | undefined>(undefined);
    const [selectedBranch, setSelectedBranch] = useState<number | undefined>(undefined);
    const handler = (callback: (prev: Account) => Account) => setAccount(callback);

    const OpenFranchise = (index?: number) => {
        setSelectedFranchise(index);
        setOpenFranchise(!openFranchise);
    }

    const OpenSocial = (findex?: number, bindex?: number) => {
        setSelectedFranchise(findex);
        setSelectedBranch(bindex);
        setOpenSocial(!openSocial);
    }

    return (
        <AccountContext.Provider value={{
            handler, account,
            openFranchise, openSocial,
            selectedFranchise, selectedBranch,
            OpenFranchise, OpenSocial
        }}>
            {children}
        </AccountContext.Provider>
    )
}