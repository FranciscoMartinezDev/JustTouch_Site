import { Category } from "@/Models/Category";
import { Menu } from "@/Models/Menu";

export interface IMenuContext {
    isMenuLoading: boolean,
    menu: Menu,
    category: Category,
    handler: (callback: (prev: Category) => Category) => void,
    GetMenu: () => void,
    AddCategory: () => void,
}