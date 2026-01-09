import { createBrowserRouter } from "react-router";
import { MainLayout } from "./Pages/MainLayout";
import { MenuInfo } from "./Pages/Menu/MenuInfo";
import { Menu } from "./Pages/Menu/Menu";
import { Account } from "./Pages/Account/Account";
import { SignIn } from "./Pages/Account/SignIn";
import { ServiceRequest } from "./Pages/Account/ServiceRequest";
import { EmailConfirmation } from './Pages/Account/EmailConfirmation';

export const router = createBrowserRouter([
    {
        // agregar parametro
        path: '/email-confirm',
        element: <EmailConfirmation />
    },
    {
        path: '/service-request',
        element: <ServiceRequest />
    },
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