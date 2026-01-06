import { createBrowserRouter } from "react-router";
import { MainLayout } from "./Pages/MainLayout";
import { MenuInfo } from "./Pages/Menu/MenuInfo";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />
    }, 
    {
        path: '/menu',
        element: <MenuInfo />
    }
]);