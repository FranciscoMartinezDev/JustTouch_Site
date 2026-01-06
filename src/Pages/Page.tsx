import { FC, ReactNode } from "react";
import { Flex, Grid, Typography } from "antd";

const { Title } = Typography;
const { useBreakpoint } = Grid;

interface Props {
    className?: string,
    HeadTitle: string,
    Actions: ReactNode
    Body: ReactNode,
}

export const Page: FC<Props> = ({ className, HeadTitle, Actions, Body }) => {
    const screens = useBreakpoint();

    return (
        <Flex vertical className={`page ${className}`} style={{ width: '85%' }}>
            <Flex vertical={false} align="center" className="page-header">
                <Title level={1} style={{ fontSize: screens.xxl || screens.xl || screens.lg ? 50 : 30 }}>{HeadTitle}</Title>
                <Flex className="page-actions">{Actions}</Flex>
            </Flex>
            <Flex vertical className="page-body">
                {Body}
            </Flex>
        </Flex>
    )
}