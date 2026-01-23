import { Account } from '@/Models/Account';
import { AuthData } from '@/Models/Db/AuthData';
import Dexie, { type EntityTable } from 'dexie';

class Database extends Dexie {
    authData!: EntityTable<AuthData, 'id'>;
    accountData!: EntityTable<Account, 'id'>;
    
    constructor() {
        super('LocalDb');
        
        this.version(1).stores({
            authData: AuthData.schema.join(', '),
            accountData: Account.schema.join(', ')
        })
    }
}


export const db = new Database();