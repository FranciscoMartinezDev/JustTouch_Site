import { createBrowserRouter } from "react-router";
import { MainLayout } from "./Pages/MainLayout";
import { MenuInfo } from "./Pages/Menu/MenuInfo";
import { Menu } from "./Pages/Menu/Menu";
import { Account } from "./Pages/Account/Account";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout Body={<Menu />} />
    },
    {
        path: '/menu',
        element: <MainLayout Body={<MenuInfo />} />
    },
    {
        path: '/account',
        element: <MainLayout withSide={false} Body={<Account />} />
    }
]);