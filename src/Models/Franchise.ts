import { Branch } from './Branch';

export class Franchise {
    id: number = 0;
    fantasyName: string = String();
    companyName: string = String();
    taxId: string = String();
    taxCategory: string = String();
    deleted: boolean = false;
    branches: Branch[] = [];

    constructor(init?: Partial<Franchise>) {
        Object.assign(this, init);
    }
}