import { FC, ReactNode } from "react";
import { Page } from "@/Pages/Page";
import { Button, Checkbox, Collapse, Flex, Space, Tag, Typography } from "antd";
import { FaRegSquarePlus, FaRegRectangleXmark, FaRegPenToSquare, FaAngleDown } from "react-icons/fa6";
import './Menu.scss';

const { Text } = Typography;


export const Menu: FC = () => {


    return (
        <Page HeadTitle="Menu"
            className="menu"
            Actions={<Button color="cyan" variant="solid" icon={<FaRegSquarePlus />}>Añadir</Button>}
            Body={<Catalog />}
        />
    )
}



const Catalog: FC = () => {

    const CatalogHeader: FC = () => (
        <Flex align="center" className="catalog">
            <Text>Catalogo 1</Text>
            <Space style={{ marginLeft: 'auto', color: 'white' }}>
                <Button color="danger" variant="solid" icon={<FaRegRectangleXmark />} />
                <Button color="gold" variant="solid" icon={<FaRegPenToSquare />} />
            </Space>
        </Flex>
    )

    const ProductList: FC = () => (
        <Flex vertical>
            <Flex className="product">
                <Text>Producto 1</Text>
                <Space style={{ marginLeft: 'auto' }}>
                    <Text>$ 50.50</Text>
                    <Checkbox checked={true}>
                        <Tag style={{ color: 'white' }} variant="solid" color={'green'}>Disponible</Tag>
                    </Checkbox>
                </Space>
            </Flex>
        </Flex>
    )



    return (
        <Collapse defaultActiveKey={['1']}
            expandIconPlacement={'end'}
            expandIcon={(): ReactNode => <Button variant="solid" style={{
                margin: 'auto', height: 45,
                width: 45, border: 'none', fontSize: '1.2rem', color: 'gray'
            }} icon={<FaAngleDown />} />}
            items={[
                {
                    label: <CatalogHeader />,
                    children: <ProductList />
                }]} />
    )
}
