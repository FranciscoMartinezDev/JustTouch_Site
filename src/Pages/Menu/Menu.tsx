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
            Actions={<Button color="cyan" variant="solid" icon={<FaRegSquarePlus />}>Añadir</Button>}
            Body={<Catalog />}
        />
    )
}



const Catalog: FC = () => {
    const screens = useBreakpoint();

    const catalogFontSize = screens.xxl || screens.xl || screens.lg || screens.md ? 20 : screens.sm ? 20 : screens.xs ? 15 : 10;

    const CatalogHeader: FC = () => (
        <ConfigProvider theme={{
            token: {
                fontSize: catalogFontSize
            },
        }}>
            <Flex align="center" className="catalog">
                <Text>Catalogo 1</Text>
                <Space style={{ marginLeft: 'auto', color: 'white' }}>
                    <Button color="danger" variant="solid" icon={<FaRegRectangleXmark />} />
                    <Button color="gold" variant="solid" icon={<FaRegPenToSquare />} />
                    <Button className="btn-dropdown" variant="solid" style={{
                    margin: 'auto', border: 'none', color: 'gray'
                }} icon={<FaAngleDown />} />
                </Space>
            </Flex>
        </ConfigProvider>
    )

    const productFontSize = screens.xxl || screens.xl || screens.lg || screens.md ? 15 : screens.sm ? 12 : 10;
    const ProductList: FC = () => (
        <ConfigProvider theme={{
            token: {
                fontSize: productFontSize
            }
        }}>
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
        </ConfigProvider>
    )



    return (
        <ConfigProvider theme={{
            token: {
                fontSize: catalogFontSize
            }
        }}>
            <Collapse defaultActiveKey={['1']}
                expandIconPlacement={'end'}
                expandIcon={(): ReactNode => null}
                items={[
                    {
                        label: <CatalogHeader />,
                        children: <ProductList />
                    }]} />
        </ConfigProvider>
    )
}
