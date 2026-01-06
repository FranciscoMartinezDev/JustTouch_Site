import { FC } from "react";
import { Button, Dropdown, Layout, Menu, Typography, Image, Grid, Drawer, Flex, ConfigProvider, Divider } from "antd";
import { FaAngleLeft, FaBars, FaRegCircleUser } from "react-icons/fa6";
import { UseAppContext } from "@/Context/AppContext";
import { viewMap } from "./Pager";
import { useApp } from "@/Hooks/AppHook";
import './MainLayout.scss';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const { useBreakpoint } = Grid;

export const MainLayout: FC = () => {
    const screens = useBreakpoint();
    const { collapsed, changeCollaped } = useApp();
    const { sideItems, items } = UseAppContext();

    return (
        <Layout className="main-layout">
            {screens.xxl || screens.xl || screens.lg ?
                <Sider className="layout-sider" width={300} trigger={null} collapsible collapsed={collapsed}>
                    <Flex className="side-header" justify="center">
                        <Image preview={false}
                            width={55}
                            src="https://dvvlhkouasxqzmaxkvll.supabase.co/storage/v1/object/public/footages/JustTouchLogo.png" />
                    </Flex>
                    <Divider className="divider" />
                    <Menu mode="inline" defaultSelectedKeys={['1']} items={sideItems} />
                </Sider>
                :
                <Drawer className="floating-sider"
                    title={<FloatingTitle />}
                    placement={'left'}
                    closable={false}
                    open={collapsed}
                    size={256}>
                    <Menu mode="inline" defaultSelectedKeys={['1']} items={sideItems} />
                </Drawer>
            }

            {/* ====================================================================================================================== */}
            <Layout>
                <ConfigProvider theme={{
                    token: {
                        fontSize: screens.xxl || screens.xl || screens.lg ? 17 : 15
                    }
                }}>
                    <Header className="layout-header">
                        <Button size="large" type="text" icon={<FaBars />} onClick={changeCollaped} />
                        <Text>Just Touch</Text>
                        <Dropdown menu={{ items }} placement="bottomRight">
                            <Button size="large"
                                style={{ fontSize: screens.xxl || screens.xl || screens.lg ? 17 : 15 }}
                                icon={<FaRegCircleUser />}
                                variant="solid">Usuario</Button>
                        </Dropdown>
                    </Header>
                </ConfigProvider>
                <Content className="layout-content">
                    {viewMap['Menu']()}
                    <div className="fader"></div>
                </Content>
            </Layout>
        </Layout>
    )
}



const FloatingTitle: FC = () => {
    const { changeCollaped } = useApp();

    return (
        <Flex align="center" gap={20}>
            <Button icon={<FaAngleLeft />}
                onClick={changeCollaped}
                style={{ backgroundColor: 'inherit', border: 'none', color: 'white', fontSize: 20 }} />
            <Image preview={false}
                width={70}
                src="https://dvvlhkouasxqzmaxkvll.supabase.co/storage/v1/object/public/footages/JustTouchLogo.png" />
        </Flex>
    )
}