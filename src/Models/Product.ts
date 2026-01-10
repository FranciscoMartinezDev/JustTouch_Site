export class Product {
    id: number = 0;
    name: string = String();
    description: string = String();
    price: number = 0;
    pictureUrl: string = String();
    signedUrl: string = String();
    productCode: string = String();
    isAvailable: boolean = true;

    constructor(data?: Partial<Product>) {
        Object.assign(this, data);
    }
}