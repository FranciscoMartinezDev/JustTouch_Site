import { Category } from '@/Models/Category';
import { ContextChildren } from '@/Models/Interfaces/ContextChildren';
import { IMenuContext } from '@/Models/Interfaces/IMenuContext';
import { Menu } from '@/Models/Menu';
import { Product } from '@/Models/Product';
import { JustTouchClient } from '@/Services/Client';
import { createContext, FC, useContext, useState } from 'react';

const MenuContext = createContext<IMenuContext | undefined>(undefined);

export const useMenuContext = (): IMenuContext => {
    const context = useContext(MenuContext);
    if (!context) throw new Error('Menu Context not provided!');
    return context;
}

export const MenuProvider: FC<ContextChildren> = ({ children }) => {
    const [isMenuLoading, setIsMenuLoading] = useState<boolean>(false);
    const [menu, setMenu] = useState<Menu>(new Menu());
    const [category, setCategory] = useState<Category>(new Category({ products: [new Product()] }));
    const service = JustTouchClient.getInstance();

    const handler = (callback: (prev: Category) => Category) => {
        setCategory(callback);
    }

    const GetMenu = async () => {
        if (menu == undefined) {
            setIsMenuLoading(true);
            var data = await service.Get<Menu>("menu", "43EZhYNBeo");

            if (data.success) {
                setMenu(data.data);
                setIsMenuLoading(false);
                return;
            }
            setIsMenuLoading(false);
            alert('error');
        }
    }

    return (
        <MenuContext.Provider value={{
            isMenuLoading,
            handler,
            menu, category, GetMenu
        }}>
            {children}
        </MenuContext.Provider>
    )
}