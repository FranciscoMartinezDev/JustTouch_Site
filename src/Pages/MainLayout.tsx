import { FC, useState } from "react";
import { Button, Dropdown, Layout, Menu, Typography, type MenuProps, Image } from "antd";
import { FaBowlRice, FaStore, FaBars, FaRegCircleUser, FaPowerOff } from "react-icons/fa6";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import './MainLayout.scss';
import { viewMap } from "./Pager";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;


export const MainLayout: FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const items: MenuProps['items'] = [
        {
            key: '1',
            icon: <FaRegCircleUser />,
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Cuenta
                </a>
            ),
        },
        {
            key: '2',
            icon: <FaPowerOff />,
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Cerrar sesión
                </a>
            ),
        },
    ];

    const sideItems: ItemType<MenuItemType>[] | undefined = [
        {
            className: 'sider-item',
            key: '1',
            icon: <FaStore />,
            label: 'Ordenes',
        },
        {
            className: 'sider-item',
            key: '2',
            icon: <FaBowlRice />,
            label: 'Menu',
        }
    ]



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