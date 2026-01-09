import { createBrowserRouter } from "react-router";
import { MainLayout } from "./Pages/MainLayout";
import { MenuInfo } from "./Pages/Menu/MenuInfo";
import { Menu } from "./Pages/Menu/Menu";
import { Account } from "./Pages/Account/Account";
import { SignIn } from "./Pages/Account/SignIn";

export const router = createBrowserRouter([
    {
        path: '/sign-in',
        element: <SignIn />
    },
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