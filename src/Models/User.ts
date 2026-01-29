import { Franchise } from "./Franchise";

export class User {
    accountKey:string = String();
    firstName:string = String();
    lastName:string = String();
    userName:string = String();
    phone:string = String();
    email:string = String();
    password:string = String();
    repeat:string = String();
    franchises: Franchise[] = [];
    
    constructor(init?: Partial<User>){
        Object.assign(this, init);
    }
}