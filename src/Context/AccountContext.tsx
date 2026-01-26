import { Validator } from '@/Helpers/Validator';
import { Account } from '@/Models/Account';
import { ContextChildren } from '@/Models/Interfaces/ContextChildren';
import { IAccountContext } from '@/Models/Interfaces/IAccountContext';
import { createContext, FC, useContext, useState } from 'react';

const AccountContext = createContext<IAccountContext | undefined>(undefined);


export const useAccountContext = (): IAccountContext => {
    const context = useContext(AccountContext);
    if (!context) throw new Error('account context not provided!');
    return context;
}

export const AccountProvider: FC<ContextChildren> = ({ children }) => {
    const [account, setAccount] = useState<Account>(new Account());

    const [selectedFranchise, setSelectedFranchise] = useState<number | undefined>(undefined);
    const [selectedBranch, setSelectedBranch] = useState<number | undefined>(undefined);

    const [franchiseModal, setFranchiseModal] = useState<boolean>(false);
    const [socialModal, setSocialModal] = useState<boolean>(false);
    const [pictureModal, setPictureModal] = useState<boolean>(false);

    const validator = Validator.getInstance();

    const handler = (callback: (prev: Account) => Account) => setAccount(callback);

    const pickFranchise = (index: number) => setSelectedFranchise(index);

    const openModal = (type: 'franchise' | 'social' | 'picture', findex?: number, bindex?: number) => {
        setSelectedFranchise(findex);
        setSelectedBranch(bindex);

        if (type == 'franchise') setFranchiseModal(true);
        if (type == 'social') setSocialModal(true);
        if (type == 'picture') setPictureModal(true);
    }

    const closeModal = (type: 'franchise' | 'social' | 'picture') => {
        setSelectedFranchise(undefined);
        setSelectedBranch(undefined);

        if (type == 'franchise') setFranchiseModal(false);
        if (type == 'social') setSocialModal(false);
        if (type == 'picture') setPictureModal(false);
    }

    const SaveChanges = () => {
        validator.AccountValidator(account);
    }

    const GoBack = () => {
        validator.AccountValidator(account);
    }


    const loadData = () =>{

    }
    
    return (
        <AccountContext.Provider value={{
            SaveChanges, GoBack,
            handler, account,
            pickFranchise, selectedFranchise, selectedBranch,
            openModal, closeModal, franchiseModal, socialModal, pictureModal
        }}>
            {children}
        </AccountContext.Provider>
    )
}