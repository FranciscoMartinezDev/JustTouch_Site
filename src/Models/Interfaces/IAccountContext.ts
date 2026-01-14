import { Account } from "../Account";

export interface IAccountContext {
    account: Account,
    handler: (callback: (prev: Account) => Account) => void,
    openFranchise: boolean,
    selectedFranchise: number | undefined,
    OpenFranchise: (index?: number) => void,
}