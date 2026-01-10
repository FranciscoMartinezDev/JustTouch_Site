import { Product } from "./Product";

export class Category {
    catalog: string = String();
    catalogCode: string = String();
    branchCode: string = String();
    products: Product[] = [];

    constructor(data?: Partial<Category>) {
        Object.assign(this, data);
    }
}