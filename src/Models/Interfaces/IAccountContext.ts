import { Account } from "../Account";

export interface IAccountContext {
    account: Account,
    handler: (callback: (prev: Account) => Account) => void,
    openFranchise: boolean,
    openSocial: boolean,
    selectedFranchise: number | undefined,
    selectedBranch: number | undefined,
    OpenFranchise: (index?: number) => void,
    OpenSocial: (findex?: number, bindex?: number) => void,
}