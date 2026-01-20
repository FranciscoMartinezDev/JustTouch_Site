import { UploadFile } from "antd";

export class Branch {
    id: number = 0;
    country: string = String();
    provinceOrState: string = String();
    city: string = String();
    address: string = String();
    postalCode: string = String();
    email?: string;
    openTime?: string;
    closeTime?: string;
    
    instagramUrl?: string;
    facebookUrl?: string;
    whatsappUrl?: string;

    coverUrl?: string;
    coverFile?: UploadFile[];
    
    pictureUrl?: string;
    pictureFile?: UploadFile[];

    branchCode: string = String();

    constructor(init?: Partial<Branch>) {
        Object.assign(this, init);
    }
}
