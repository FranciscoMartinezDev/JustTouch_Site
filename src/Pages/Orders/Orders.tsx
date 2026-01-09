import { FC, useState } from "react";
import { Page } from "@/Pages/Page";
import { Button, Card, Col, Flex, Modal, Row, Tabs, Tag, Typography, Grid } from "antd";
import { OrderStatus } from "@/Models/Enums/OrderStatus";
import './Orders.scss';
import { useApp } from "@/Hooks/AppHook";

const { Text } = Typography;
const { useBreakpoint } = Grid;

export const Orders: FC = () => {
    const items = Object.entries(OrderStatus).map((x, i) => {
        const labels = (tab: number) => {
            switch (tab) {
                case 1: return 'Pendientes'
                case 2: return 'Tomadas'
                case 3: return 'En camino'
                case 4: return 'Listos'
                default: break;
            }
        }
        return { label: labels(x[1]), key: String(i - 1), children: <OrderTab Tab={x[1]} Label={labels(x[1])} /> }
    });

    return (
        <Page HeadTitle="Pedidos"
            Actions={<></>}
            Body={
                <div className="orders">
                    <Tabs items={items} />
                </div>
            } />
    )
}

interface TabProps {
    Tab: number,
    Label?: string,
}

const OrderTab: FC<TabProps> = ({ Tab, Label }) => {

    return (
        <div className="order-tab">
            <DetailModal />
            <Row style={{ gap: 10 }}>
                <Col xl={9} lg={11} md={9} sm={24} xs={24}>
                    <Card className="order-list">
                        <OrderItem Tab={Tab} Label={Label} />
                        <OrderItem Tab={Tab} Label={Label} />
                        <OrderItem Tab={Tab} Label={Label} />
                        <OrderItem Tab={Tab} Label={Label} />
                        <OrderItem Tab={Tab} Label={Label} />
                        <OrderItem Tab={Tab} Label={Label} />
                        <OrderItem Tab={Tab} Label={Label} />
                        <OrderItem Tab={Tab} Label={Label} />
                    </Card>
                </Col>
                <Col xl={9} lg={12} md={14} sm={0} xs={0}>
                    <Detail />
                </Col>
            </Row>
        </div>
    )
}

const Detail: FC = () => {
    return (
        <Card className="order-detail">
            <p>Cliente: <b>Juan chota larga</b></p>
            <Flex vertical className="detail">
                <Flex vertical className="detail-item">
                    <p>Pedido <b>#1</b></p>
                    <ul>
                        <li>
                            Producto 1
                        </li>
                        <li>
                            Producto 2
                        </li>
                        <li>
                            Producto 3
                        </li>
                        <li>
                            Producto 4
                        </li>
                    </ul>
                </Flex>
                <Flex vertical className="detail-item">
                    <p>Pedido <b>#1</b></p>
                    <ul>
                        <li>
                            Producto 1
                        </li>
                        <li>
                            Producto 2
                        </li>
                        <li>
                            Producto 3
                        </li>
                        <li>
                            Producto 4
                        </li>
                    </ul>
                </Flex>
                <Flex vertical className="detail-item">
                    <p>Pedido <b>#1</b></p>
                    <ul>
                        <li>
                            Producto 1
                        </li>
                        <li>
                            Producto 2
                        </li>
                        <li>
                            Producto 3
                        </li>
                        <li>
                            Producto 4
                        </li>
                    </ul>
                </Flex>
            </Flex>
            <Flex vertical gap={10}>
                <Flex justify="space-between">
                    <p>Total: <b>$ 50.50</b></p>
                    <p style={{marginLeft: 'auto'}}>Promocion aplicada: <b>promocion</b></p>
                </Flex>
                <Flex gap={10} wrap>
                    <Button color="primary" size="middle" variant="filled">Tomar</Button>
                    <Button color="primary" size="middle" variant="filled">En camino</Button>
                    <Button color="primary" size="middle" variant="filled">Listo</Button>
                </Flex>
            </Flex>
        </Card>
    )
}

interface OrderProps {
    Tab: number,
    Label?: string,
}

const OrderItem: FC<OrderProps> = ({ Tab, Label }) => {
    const { isLarge } = useApp();
    const { sm, xs, md, lg, xl, xxl } = useBreakpoint();

    const click = () => {
        if ((xs || sm ) && !md && !lg && !xl && !xxl) {
            console.log('modal')
        }
    }
    return (
        <Flex className="order-item" onClick={click} style={{ padding: isLarge ? '15px 10px' : '10px 10px' }}>
            <Flex vertical gap={5}>
                <Text>Pedido: #10</Text>
                <p>Armando barreda</p>
            </Flex>
            <div style={{ marginLeft: 'auto' }}>
                <Tag variant="solid"
                    style={{ color: 'white' }}
                    color={Tab == 1 ? 'volcano' : Tab == 2 ? 'warning' : Tab == 3 ? 'purple' : 'cyan'}>
                    {Label != null ?
                        // si el ultimo caracter es una s
                        String(Label).substring(Label?.length! - 1, Label?.length!) == 's' ?
                            // quita la ultima s
                            String(Label).substring(0, Label?.length! - 1)
                            :
                            // devuelve el valor completo
                            Label
                        : null}
                </Tag>
            </div>
        </Flex>
    )
}

const DetailModal: FC = () => {
    return (
        <Modal
            title="Detalle del pedido"
            open={false}>
            <Detail />
        </Modal>
    )
}