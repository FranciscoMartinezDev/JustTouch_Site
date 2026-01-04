import { createContext, FC, useContext } from "react";
import { IAppContext } from '@/Interfaces/IAppContext';
import { ContextChildren } from "@/Interfaces/ContextChildren";
import { FaBowlRice, FaPowerOff, FaRegCircleUser, FaStore } from "react-icons/fa6";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { MenuProps } from "antd";

const AppContext = createContext<IAppContext | undefined>(undefined);

export const UseAppContext = (): IAppContext => {
    const context = useContext(AppContext);
    if (!context) throw new Error('App Context not provided!');
    return context;
}

export const AppProvider: FC<ContextChildren> = ({ children }) => {

    const items: MenuProps['items'] = [
        {
            key: '1',
            icon: <FaRegCircleUser />,
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Cuenta
                </a>
            ),
        },
        {
            key: '2',
            icon: <FaPowerOff />,
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Cerrar sesión
                </a>
            ),
        },
    ];

    const sideItems: ItemType<MenuItemType>[] | undefined = [
        {
            className: 'sider-item',
            key: '1',
            icon: <FaStore />,
            label: 'Ordenes',
        },
        {
            className: 'sider-item',
            key: '2',
            icon: <FaBowlRice />,
            label: 'Menu',
        }
    ]

    return (
        <AppContext.Provider value={{ sideItems, items }}>
            {children}
        </AppContext.Provider>
    )
}

