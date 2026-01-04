import { FC, useState } from "react";
import { Button, Dropdown, Layout, Menu, Typography, Image, Grid, Drawer, Flex } from "antd";
import { FaAngleLeft, FaBars } from "react-icons/fa6";
import './MainLayout.scss';
import { UseAppContext } from "@/Context/AppContext";
import { viewMap } from "./Pager";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const { useBreakpoint } = Grid;
export const MainLayout: FC = () => {
    const screens = useBreakpoint();

    const { sideItems, items } = UseAppContext();
    const [collapsed, setCollapsed] = useState<boolean>(true);



    return (
        <Layout className="main-layout">
            <Header className="layout-header">
                {screens.xxl || screens.xl || screens.lg || screens.md ?
                    <Image preview={false}
                        width={60}
                        src="https://dvvlhkouasxqzmaxkvll.supabase.co/storage/v1/object/public/footages/JustTouchLogo.png" />
                    : null}
                {screens.xxl || screens.xl || screens.lg ? <Text>Just Touch</Text> : null}
                <Button type="text" icon={<FaBars />} onClick={() => setCollapsed(!collapsed)} />
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Button>Usuario</Button>
                </Dropdown>
            </Header>
            <Layout>
                {screens.xxl || screens.xl || screens.lg || screens.md ?
                    <Sider className="layout-sider" trigger={null} collapsible collapsed={collapsed}>
                        <Menu mode="inline" defaultSelectedKeys={['1']}
                            items={sideItems} />
                    </Sider>
                    : <Drawer
                        className="floating-sider"
                        title={
                            <Flex align="center" gap={20}>
                                <Button icon={<FaAngleLeft />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{ backgroundColor: 'inherit', border: 'none', color: 'white', fontSize: 20 }} />
                                <Image preview={false}
                                    width={70}
                                    src="https://dvvlhkouasxqzmaxkvll.supabase.co/storage/v1/object/public/footages/JustTouchLogo.png" />
                            </Flex>
                        }
                        placement={'left'}
                        closable={false}
                        open={collapsed}
                        size={256}
                    // resizable={{
                    //     onResize: (newSize) => setSize(newSize),
                    // }}
                    >
                        <p>Drag the edge to resize the drawer</p>
                        <p>Current size: 256px</p>
                    </Drawer>}

                <Content className="layout-content">
                    {viewMap['Menu']()}
                </Content>
            </Layout>
        </Layout>
    )
}