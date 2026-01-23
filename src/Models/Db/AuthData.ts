export class AuthData {
    id?: number;
    BranchCode?: string;
    Token?: string;
    
    static schema = ['++id', 'Token', 'BranchCode'] as const;

    constructor(init?: Partial<AuthData>) {
        Object.assign(this, init);
    }
}