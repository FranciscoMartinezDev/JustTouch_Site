import { FC, useEffect } from "react";
import { Page } from "@/Pages/Page";
import { Button, Checkbox, Flex, Tag, Divider, Empty } from "antd";
import { FaRegSquarePlus, FaRegRectangleXmark, FaRegPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { motion } from 'framer-motion';
import { useFramerMotion } from "../../Hooks/MotionHook";
import { useApp } from "@/Hooks/AppHook";
import './Menu.scss';
import { useMenuContext } from "@/Context/MenuContext";


export const Menu: FC = () => {
    const { GetMenu, menu } = useMenuContext();
    const navigate = useNavigate();
    const { fadeUp } = useFramerMotion();
    const { isLarge, isMed } = useApp();

    const sizeButton = isLarge ? "large" : isMed ? "middle" : "small";

    useEffect(() => {
        GetMenu();
    }, [menu]);

    return (
        <Page HeadTitle="Menu"
            className="menu"
            Actions={<Button color="cyan"
                variant="solid"
                size={sizeButton}
                icon={<FaRegSquarePlus />}
                onClick={() => navigate('/menu')}>Añadir</Button>}
            Body={
                <div>
                    {/* <Catalogs /> */}
                    <motion.div custom={.2} variants={fadeUp} initial="hidden" animate="show" exit="exit">
                        <Empty description="Aun no hay productos en el menu" />
                    </motion.div>
                </div>
            } />
    )
}


const Catalogs: FC = () => {
    const { isLarge } = useApp();

    return (
        <div className="catalogs" style={{ flexDirection: isLarge ? 'row' : 'column' }}>
            <aside className="catalog-list" style={{
                width: isLarge ? '15vw' : '100%',
                height: isLarge ? '100%' : 'auto'
            }}>
                <Button color="blue" variant="filled">Catalogo 1</Button>
                <Button color="blue" variant="filled">Catalogo 1</Button>
                <Button color="blue" variant="filled">Catalogo 1</Button>
                <Button color="blue" variant="filled">Catalogo 1</Button>
                <Button color="blue" variant="filled">Catalogo 1</Button>
            </aside>
            <Divider style={{ height: isLarge ? '500px' : 'auto' }} vertical={isLarge ? true : false} />
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