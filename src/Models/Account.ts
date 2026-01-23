import { Franchise } from "./Franchise";
import { User } from "./User";

export class Account {
    id?: number;
    userData: User = new User();
    franchises: Franchise[] = []

    static schema = ['++id', 'userData', 'franchises'] as const;
    constructor(init?: Partial<Account>) {
        Object.assign(this, init);
    }
}