import { createBrowserRouter } from "react-router";
import { MainLayout } from "./Pages/MainLayout";
import { MenuInfo } from "./Pages/Menu/MenuInfo";
import { Menu } from "./Pages/Menu/Menu";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout Body={<Menu />} />
    },
    {
        path: '/menu',
        element: <MainLayout Body={<MenuInfo />} />
    }
]);