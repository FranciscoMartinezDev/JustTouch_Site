import { Menu } from "../Menu";

export interface IMenuContext {
    isMenuLoading: boolean,
    menu: Menu | undefined,
    GetMenu: () => void,
}