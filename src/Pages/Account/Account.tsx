import { CSSProperties, FC, useState } from "react";
import { Card, Input, Grid, Flex, Button, Typography, ConfigProvider, Tabs, TabsProps, Row, Col, Select, TimePicker, Space } from "antd";
import { Page } from "@/Pages/Page";
import { HeadActions } from "@/Components/HeadActions";
import { useApp } from "@/Hooks/AppHook";
import './Account.scss';
import { FaRegSquarePlus, FaRegPenToSquare } from "react-icons/fa6";
import { Countries } from "@/Models/Enums/Countries";
import { DefaultOptionType } from "antd/es/select";

const { useBreakpoint } = Grid;
const { Text } = Typography;
const { RangePicker } = TimePicker;


export const Account: FC = () => {

    return (
        <Page HeadTitle="Editar perfil"
            Actions={<HeadActions />}
            Body={
                <div className="account">
                    <UserData />
                    <Franchises />
                </div>
            } />
    )
}


const UserData: FC = () => {
    const screens = useBreakpoint();
    const { isLarge, isMed } = useApp();

    const inputSize = isLarge ? 'large' : isMed ? 'middle' : 'middle';

    const min = screens.xl ? 300 : screens.md ? 250 : screens.sm ? 200 : screens.sm ? 150 : 100;
    const gridProps: CSSProperties = {
        display: 'grid',
        gap: isLarge ? 20 : isMed ? 10 : 7,
        gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`
    }

    return (
        <Card className="user-data" styles={{ body: gridProps }}>
            <div>
                <p>Nombre</p>
                <Input size={inputSize} placeholder="Nombre..." />
            </div>
            <div>
                <p>Apellido</p>
                <Input size={inputSize} placeholder="Apellido..." />
            </div>
            <div>
                <p>Usuario</p>
                <Input size={inputSize} placeholder="Usuario..." />
            </div>
            <div>
                <p>Telefono</p>
                <Input size={inputSize} placeholder="Telefono..." />
            </div>
            <div>
                <p>Email</p>
                <Input size={inputSize} placeholder="Email..." />
            </div>
            <div>
                <p>Contraseña</p>
                <Input size={inputSize} placeholder="Contraseña..." type={'password'} />
            </div>
            <div>
                <p>Repetir Contraseña</p>
                <Input size={inputSize} placeholder="Repetir..." type={'password'} />
            </div>
        </Card>
    )
}


const Franchises: FC = () => {
    const items = [
        { label: <Flex align="center" gap={10}><p style={{ margin: 0 }}>Franquicia 1</p> <Button color="orange" size="small" variant="filled"><p style={{ margin: 0 }}><FaRegPenToSquare /></p></Button></Flex>, children: <BranchList />, key: '1' },
        { label: 'Tab 2', children: 'Content of Tab 2', key: '2' },
        {
            label: 'Tab 3',
            children: 'Content of Tab 3',
            key: '3',
            closable: false,
        },
    ]

    return (
        <Card className="franchises">
            <ConfigProvider theme={{ components: { Typography: { fontSize: 17 } } }}>
                <Flex align="center">
                    <Text>Franquicias</Text>
                    <Button size="middle" color="cyan" variant="filled">
                        <FaRegSquarePlus />
                        <p>Agregar</p>
                    </Button>
                </Flex>
            </ConfigProvider>
            <Tabs defaultActiveKey="1"
                items={items} />
        </Card>
    )
}

const BranchList: FC = () => {
    return (
        <Flex vertical className="branch-list" gap={40}>
            <BranchItem />
            <BranchItem />
            <BranchItem />
        </Flex>
    )
}

const BranchItem: FC = () => {
    const options: DefaultOptionType[] = Array.from(Object.entries(Countries).map((x) => {
        return { label: x[1], value: x[0] }
    }))

    return (
        <div className="branch-item">
            <Button color="red" variant="filled" size="small" style={{ marginBottom: 10 }}><p>Quitar</p></Button>
            <Row style={{ gap: 10 }}>
                <Col xl={5} lg={5} md={5} sm={12} xs={24}>
                    <Select defaultValue="AR" options={options} />
                </Col>
                <Col xl={5} lg={5} md={5} sm={11} xs={24}>
                    <Input placeholder="Provincia o estado..." />
                </Col>
                <Col xl={5} lg={5} md={6} sm={12} xs={24}>
                    <Input placeholder="Ciudad..." />
                </Col>
                <Col xl={5} lg={5} md={6} sm={11} xs={24}>
                    <Input placeholder="Direccion..." />
                </Col>
            </Row>
            <Row style={{ gap: 10, marginTop: 10 }}>
                <Col xl={5} lg={5} md={5} sm={12} xs={24}>
                    <Input placeholder="Codigo Postal..." />
                </Col>
                <Col xl={5} lg={5} md={5} sm={11} xs={24}>
                    <Input placeholder="Email (Opcional)..." />
                </Col>
                <Col xl={5} lg={5} md={12} sm={12} xs={24}>
                    <RangePicker showSecond={false}
                        variant="outlined" placeholder={['Abierto', 'Cerrado']} />
                </Col>
                <Col xl={5} lg={5} md={5} sm={11} xs={24}>
                    <Space>
                        <Button color="primary" variant="filled"><p>Portada</p></Button>
                        <Button color="primary" variant="filled"><p>Contactos</p></Button>
                    </Space>
                </Col>
            </Row>
        </div>
    )
}