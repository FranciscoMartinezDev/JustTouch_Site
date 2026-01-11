export class Product {
    id: number = 0;
    name: string = String();
    description: string = String();
    price: string = String();
    pictureUrl: string = String();
    signedUrl: string = String();
    productCode: string = String();
    isAvailable: boolean = true;
    image?: File;

    constructor(data?: Partial<Product>) {
        Object.assign(this, data);
    }
}