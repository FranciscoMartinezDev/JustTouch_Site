import { FC, ReactNode } from "react";
import { Divider, Flex, Typography } from "antd";

const { Title } = Typography;

interface Props {
    className?: string,
    HeadTitle: string,
    Actions: ReactNode
    Body: ReactNode,
}

export const Page: FC<Props> = ({ className, HeadTitle, Actions, Body }) => {

    return (
        <Flex vertical className={`base-page ${className}`}>
            <Flex vertical={false} align="center" className="page-header">
                <Title level={4}>{HeadTitle}</Title>
                <Flex className="page-actions">{Actions}</Flex>
            </Flex>
            <Divider style={{ borderColor: "lightgray", margin: 0 }} />
            <Flex vertical className="page-body">
                {Body}
            </Flex>
        </Flex>
    )
}