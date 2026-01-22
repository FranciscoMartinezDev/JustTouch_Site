import { Account } from "../Account";

export interface IAccountContext {
    account: Account;
    SaveChanges: () => void;
    GoBack: () => void;
    handler: (callback: (prev: Account) => Account) => void;
    pickFranchise: (index: number) => void;
    selectedFranchise: number | undefined;
    selectedBranch: number | undefined;
    openModal: (type: 'franchise' | 'social' | 'picture', findex?: number, bindex?: number) => void;
    closeModal: (type: 'franchise' | 'social' | 'picture') => void;
    franchiseModal: boolean;
    socialModal: boolean;
    pictureModal: boolean;
}