import { Franchise } from "./Franchise";
import { User } from "./User";

export class Account {
    userData: User = new User();
    franchises: Franchise[] = []

    constructor(init?: Partial<Account>) {
        Object.assign(this, init);
    }
}