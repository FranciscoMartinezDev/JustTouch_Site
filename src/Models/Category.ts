import { Product } from "./Product";

export class Category {
    category: string = String();
    categoryCode: string = String();
    branchCode: string = String();
    products: Product[] = [];

    constructor(data?: Partial<Category>) {
        Object.assign(this, data);
    }
}