import { Menu } from "@/Pages/Menu/Menu";

type ViewKey = "Orders" | "Menu"

export const viewMap: Record<ViewKey, () => React.ReactNode> = {
    Orders: () => <></>,
    Menu: () => <Menu />,
};