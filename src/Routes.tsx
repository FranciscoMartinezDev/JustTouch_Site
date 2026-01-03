import { createBrowserRouter } from "react-router";
import { MainLayout } from "./Pages/MainLayout";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout />
    }
]);