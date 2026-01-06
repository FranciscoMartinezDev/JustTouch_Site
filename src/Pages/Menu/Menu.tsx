import { FC } from "react";
import { Page } from "@/Pages/Page";
import { Button, Checkbox, Flex, Tag, Grid, Divider, Empty } from "antd";
import { FaRegSquarePlus, FaRegRectangleXmark, FaRegPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router";

import './Menu.scss';

const { useBreakpoint } = Grid;


export const Menu: FC = () => {
    const navigate = useNavigate();


    return (
        <Page HeadTitle="Menu"
            className="menu"
            Actions={<Button color="cyan" variant="solid" size="large" icon={<FaRegSquarePlus />} onClick={() => navigate('/menu')}>Añadir</Button>}
            Body={
                <div className="fade-up">
                    {/* <Catalogs /> */}
                    <Empty description="Aun no hay productos en el menu" />
                </div>
            } />
    )
}


const Catalogs: FC = () => {
    const screens = useBreakpoint();

    return (
        <div className="catalogs" style={{ flexDirection: screens.xxl || screens.xl || screens.lg ? 'row' : 'column' }}>
            <aside className="catalog-list" style={{
                width: screens.xxl || screens.xl || screens.lg ? '15vw' : '100%',
                height: screens.xxl || screens.xl || screens.lg ? '100%' : 'auto'
            }}>
                <Button color="blue" variant="filled">Catalogo 1</Button>
                <Button color="blue" variant="filled">Catalogo 1</Button>
                <Button color="blue" variant="filled">Catalogo 1</Button>
                <Button color="blue" variant="filled">Catalogo 1</Button>
                <Button color="blue" variant="filled">Catalogo 1</Button>
            </aside>
            <Divider style={{ height: screens.xxl || screens.xl || screens.lg ? '500px' : 'auto' }} vertical={screens.xxl || screens.xl || screens.lg ? true : false} />
            <Products />
        </div>
    )
}

const Products: FC = () => {

    return (
        <div className="product-list">
            <Flex gap={5}>
                <Button color="gold" variant="filled" size="small" icon={<FaRegPenToSquare />}>Editar</Button>
                <Button color="red" variant="filled" size="small" icon={<FaRegRectangleXmark />}>Quitar</Button>
            </Flex>
            {Array.from({ length: 50 }).map((_, i) => {
                return (<Flex className="product" key={i}>
                    <p>Producto 1</p>
                    <Flex gap={20} align="center">
                        <p>$50.50</p>
                        <Checkbox checked>
                            <Tag color={'cyan'} variant={'solid'}>
                                Disponible
                            </Tag>
                        </Checkbox>
                    </Flex>
                </Flex>)
            })}
        </div>
    )
}