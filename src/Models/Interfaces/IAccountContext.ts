import { Account } from "../Account";

export interface IAccountContext {
    account: Account,
    handler: (callback: (prev: Account) => Account) => void,
}