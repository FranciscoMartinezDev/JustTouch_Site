import { FC } from "react";
import { Page } from "@/Pages/Page";
import { Button, Card, ConfigProvider, Flex, Input, Typography, Space, Row, Col } from "antd";
import { FaRegFloppyDisk, FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useApp } from "@/Hooks/AppHook";
import { FaRegSquarePlus } from "react-icons/fa6";
import { UploadPictureCard } from "@/Components/UploadPictureCard";
import './Menu.scss';

const { Text, Link } = Typography;
const { TextArea } = Input;

export const MenuInfo: FC = () => {
    const navigate = useNavigate();
    const { isLarge, isMed } = useApp();

    const sizeButton = isLarge ? "large" : isMed ? "middle" : "small";

    return (
        <Page HeadTitle="Añadir categoria"
            className="menu-info"
            Actions={
                <Space className="actions">
                    <Button className="btn-back" size={sizeButton} icon={<FaArrowLeftLong />}
                        variant="outlined" onClick={() => navigate('/')}>Volver</Button>
                    <Button className="btn-save" size={sizeButton} icon={<FaRegFloppyDisk />} color="primary" variant="solid">Guardar</Button>
                </Space>
            }
            Body={
                <ConfigProvider theme={{
                    components: {
                        Typography: {
                            fontSize: isLarge ? 17 : 15,
                            colorText: 'gray',
                        }
                    },
                }}>
                    <Card className="info-categories">
                        <Flex vertical gap={20}>
                            <Flex style={{ width: isLarge ? '20vw' : '100%' }} vertical gap={10} className="info-category">
                                <Text>Catalogo</Text>
                                <Input placeholder="Categoria..." />
                            </Flex>
                            <Flex vertical gap={20} className="info-products">
                                <Text>Productos</Text>
                                <Flex vertical className="info-list">
                                    <ProductItem />
                                </Flex>
                                <Link>
                                    <FaRegSquarePlus /> <p style={{ margin: 0 }}>Añadir plato</p>
                                </Link>

                            </Flex>
                        </Flex>
                    </Card>
                </ConfigProvider>
            } />
    )
}



//revisar
const ProductItem: FC = () => {

    return (
        <Flex vertical gap={10}>
            <Row style={{ gap: 10 }}>
                <Col xxl={5} md={24}>
                    <Input placeholder="Nombre..." />
                </Col>
                <Col xxl={5} md={24}>
                    <Input placeholder="Precio..." />
                </Col>
            </Row>
            <Row style={{ gap: 10 }}>
                <Col xxl={21}>
                    <TextArea style={{ resize: 'none', width: '100%' }} placeholder="Descripción..." />
                </Col>
                <Col xxl={2}>
                    <UploadPictureCard className="product-image" style={{ width: 50, height: 50 }} />
                </Col>
            </Row>
        </Flex>
    )
}