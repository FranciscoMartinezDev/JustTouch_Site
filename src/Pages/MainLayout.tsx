import { FC, useState } from "react";
import { Button, Dropdown, Layout, Menu, Typography, Image } from "antd";
import { FaBars } from "react-icons/fa6";
import './MainLayout.scss';
import { UseAppContext } from "@/Context/AppContext";
import { viewMap } from "./Pager";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;


export const MainLayout: FC = () => {
    const { sideItems, items } = UseAppContext();
    const [collapsed, setCollapsed] = useState<boolean>(true);



    return (
        <Layout className="main-layout">
            <Header className="layout-header">
                <Image preview={false}
                    width={60}
                    src="https://dvvlhkouasxqzmaxkvll.supabase.co/storage/v1/object/public/footages/JustTouchLogo.png" />
                <Text>Just Touch</Text>
                <Button type="text" icon={<FaBars />} onClick={() => setCollapsed(!collapsed)} />
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Button>Usuario</Button>
                </Dropdown>
            </Header>
            <Layout>
                <Sider className="layout-sider" trigger={null} collapsible collapsed={collapsed}>
                    <Menu mode="inline" defaultSelectedKeys={['1']}
                        items={sideItems} />
                </Sider>
                <Content className="layout-content">
                    {viewMap['Menu']()}
                </Content>
            </Layout>
        </Layout>
    )
}