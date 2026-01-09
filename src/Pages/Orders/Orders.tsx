import { FC } from "react";
import { Page } from "@/Pages/Page";
import { Card, Col, Flex, Row, Tabs, Tag, Typography } from "antd";
import { OrderStatus } from "@/Models/Enums/OrderStatus";
import './Orders.scss';
import { useApp } from "@/Hooks/AppHook";

const { Text } = Typography;


export const Orders: FC = () => {
    const items = Object.entries(OrderStatus).map((x, i) => {
        const labels = (tab: number) => {
            switch (tab) {
                case 1: return 'Pendientes'
                case 2: return 'En proceso'
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
                    <Card className="order-detail">

                    </Card>
                </Col>
            </Row>
        </div>
    )
}


interface OrderProps {
    Tab: number,
    Label?: string,
}
const OrderItem: FC<OrderProps> = ({ Tab, Label }) => {
    const { isLarge } = useApp();
    return (
        <Flex className="order-item" style={{ padding: isLarge ? '15px 10px' : '10px 10px' }}>
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