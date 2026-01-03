import { Button, Dropdown, Layout, Menu, type MenuProps } from "antd";
import { FC, useState } from "react";
import { FaBowlRice, FaStore, FaBars } from "react-icons/fa6";

const { Header, Sider, Content } = Layout;

export const MainLayout: FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Cuenta
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Cerrar sesión
                </a>
            ),
        },
    ];

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="jt-logo" style={{ height: 64, backgroundColor: 'red'}} />
                <Menu mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <FaStore />,
                            label: 'Ordenes',
                        },
                        {
                            key: '2',
                            icon: <FaBowlRice />,
                            label: 'Menu',
                        }
                    ]}
                />
            </Sider>

            <Layout>
                <Header style={{ padding: 0 }}>
                    <Button
                        type="text"
                        icon={<FaBars />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            color: 'white',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Dropdown menu={{ items }} placement="bottomRight">
                        <Button>Usuario</Button>
                    </Dropdown>
                </Header>

                <Content
                    style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
                    Content
                </Content>
            </Layout>
        </Layout>
    )
}