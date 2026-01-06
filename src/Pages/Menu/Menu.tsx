import { FC, ReactNode } from "react";
import { Page } from "@/Pages/Page";
import { Button, Checkbox, Collapse, Flex, Space, Tag, Typography, ConfigProvider, Grid } from "antd";
import { FaRegSquarePlus, FaRegRectangleXmark, FaRegPenToSquare, FaAngleDown } from "react-icons/fa6";
import './Menu.scss';

const { Text } = Typography;
const { useBreakpoint } = Grid;


export const Menu: FC = () => {


    return (
        <Page HeadTitle="Menu"
            className="menu"
            Actions={<Button color="cyan" variant="solid" size="large" icon={<FaRegSquarePlus />}>Añadir</Button>}
            Body={<>
            
            </>}
        />
    )
}



const Catalogs: FC = () => {
    const screens = useBreakpoint();

}

const ProductList: FC = () => {
    const screens = useBreakpoint();
    const fontSize = screens.xxl || screens.xl || screens.lg || screens.md ? 15 : screens.sm ? 12 : 10;

}