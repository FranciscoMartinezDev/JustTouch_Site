import { FC, useEffect, useState } from "react";
import { Page } from "@/Pages/Page";
import { Button, Checkbox, Flex, Tag, Divider, Empty } from "antd";
import { FaRegSquarePlus, FaRegRectangleXmark, FaRegPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { motion } from 'framer-motion';
import { useFramerMotion } from "../../Hooks/MotionHook";
import { useApp } from "@/Hooks/AppHook";
import './Menu.scss';
import { useMenuContext } from "@/Context/MenuContext";
import { Category } from "@/Models/Category";
import { Product } from "@/Models/Product";


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
                    {menu != undefined && menu?.categories.length > 0 ? <Catalogs Items={menu.categories} /> :
                        <motion.div custom={.2} variants={fadeUp} initial="hidden" animate="show" exit="exit">
                            <Empty description="Aun no hay productos en el menu" />
                        </motion.div>
                    }
                </div>
            } />
    )
}


interface CatalogsProps {
    Items: Category[]
}
const Catalogs: FC<CatalogsProps> = ({ Items }) => {
    const { isLarge } = useApp();
    const [selected, setSelected] = useState<string>(Items[0].catalogCode);


    return (
        <div className="catalogs" style={{ flexDirection: isLarge ? 'row' : 'column' }}>
            <aside className="catalog-list" style={{
                width: isLarge ? '15vw' : '100%',
                height: isLarge ? '100%' : 'auto'
            }}>
                {Items.map((x, i) => {
                    return (
                        <Button color="blue"
                            variant="filled"
                            key={i}
                            onClick={() => setSelected(x.catalogCode)}>
                            {x.catalog}
                        </Button>
                    )
                })}
            </aside>
            <Divider style={{ height: isLarge ? '500px' : 'auto' }} vertical={isLarge ? true : false} />
            <Products Code={selected} Items={Items.filter(x => x.catalogCode == selected)[0].products} />
        </div>
    )
}

interface ProdProps {
    Code: string;
    Items: Product[]
}
const Products: FC<ProdProps> = ({ Items, Code }) => {
    const navigate = useNavigate();

    return (
        <div className="product-list">
            <Flex gap={5}>
                <Button color="gold"
                    variant="filled"
                    size="small"
                    icon={<FaRegPenToSquare />}
                    onClick={() => navigate(`/edit/menu/${Code}`)}>
                    Editar
                </Button>
                <Button color="red" variant="filled" size="small" icon={<FaRegRectangleXmark />}>Quitar</Button>
            </Flex>
            {Items.map((x, i) => {
                return (
                    <Flex className="product" key={i}>
                        <p>{x.name}</p>
                        <Flex gap={20} align="center">
                            <p>$ {x.price}</p>
                            <Checkbox checked={x.isAvailable}>
                                <Tag color={x.isAvailable ? 'cyan' : 'red'} variant={'solid'}>
                                    {x.isAvailable ? 'Disponible' : 'No disponible'}
                                </Tag>
                            </Checkbox>
                        </Flex>
                    </Flex>
                )
            })}
        </div>
    )
}