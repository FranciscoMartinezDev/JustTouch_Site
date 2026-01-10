import { ContextChildren } from '@/Models/Interfaces/ContextChildren';
import { IMenuContext } from '@/Models/Interfaces/IMenuContext';
import { Menu } from '@/Models/Menu';
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
    const [menu, setMenu] = useState<Menu | undefined>(undefined);
    const service = JustTouchClient.getInstance();


    const GetMenu = async () => {
        if (menu == undefined) {
            setIsMenuLoading(true);
            var data = await service.Get<Menu>("menu", "43EZhYNBeo");
            setIsMenuLoading(false);
            setMenu(data.data);
        }
    }

    return (
        <MenuContext.Provider value={{
            isMenuLoading,
            menu, GetMenu
        }}>
            {children}
        </MenuContext.Provider>
    )
}