import { AuthData } from '@/Models/Db/AuthData';
import { User } from '@/Models/User';
import Dexie, { type EntityTable } from 'dexie';

class Database extends Dexie {
    authData!: EntityTable<AuthData, 'id'>;
    accountData!: EntityTable<User, 'id'>;
    
    constructor() {
        super('LocalDb');
        
        this.version(1).stores({
            authData: AuthData.schema.join(', '),
            accountData: User.schema.join(', ')
        })
    }
}


export const db = new Database();