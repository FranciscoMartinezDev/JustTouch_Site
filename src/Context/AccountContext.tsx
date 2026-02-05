import { db } from '@/Database/Database';
import { Validator } from '@/Helpers/Validator';
import { ContextChildren } from '@/Models/Interfaces/ContextChildren';
import { IAccountContext } from '@/Models/Interfaces/IAccountContext';
import { User } from '@/Models/User';
import { JustTouchClient } from '@/Services/Client';
import { message } from 'antd';
import { createContext, FC, useContext, useState } from 'react';

const AccountContext = createContext<IAccountContext | undefined>(undefined);


export const useAccountContext = (): IAccountContext => {
    const context = useContext(AccountContext);
    if (!context) throw new Error('account context not provided!');
    return context;
}

export const AccountProvider: FC<ContextChildren> = ({ children }) => {
    const [account, setAccount] = useState<User>(new User());

    const [selectedFranchise, setSelectedFranchise] = useState<number | undefined>(undefined);
    const [selectedBranch, setSelectedBranch] = useState<number | undefined>(undefined);

    const [accountLoading, setAccountLoading] = useState<boolean>(false);
    const [franchiseModal, setFranchiseModal] = useState<boolean>(false);
    const [socialModal, setSocialModal] = useState<boolean>(false);
    const [pictureModal, setPictureModal] = useState<boolean>(false);
    const service = JustTouchClient.getInstance();

    const validator = Validator.getInstance();

    const handler = (callback: (prev: User) => User) => setAccount(callback);

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

    const SaveChanges = async () => {
        var isValid = validator.AccountValidator(account);
        if (isValid) {
            var updated = await service.Post<User, boolean>('account', 'Update', account);
            if (updated.success && updated.data) {
                message.success('Se han actualizado los datos de su cuenta');
                return;
            }
            message.error(updated.error);
            return;
        }
    }

    const GoBack = () => {
        validator.AccountValidator(account);
    }

    const loadData = async () => {
        try {
            setAccountLoading(true);
            var authData = await db.authData.get(1);
            var data = await service.Get<User>('account', authData?.AccountKey!);
            var account = data.data;
            setAccount(prev => {
                return { ...prev, userData: { ...account!, repeat: account?.password! }!, franchises: account?.franchises! }
            })
            setAccountLoading(false);
        } catch (e) {
            setAccountLoading(false);
        }

    }

    return (
        <AccountContext.Provider value={{
            loadData, accountLoading,
            SaveChanges, GoBack,
            handler, account,
            pickFranchise, selectedFranchise, selectedBranch,
            openModal, closeModal, franchiseModal, socialModal, pictureModal
        }}>
            {children}
        </AccountContext.Provider>
    )
}