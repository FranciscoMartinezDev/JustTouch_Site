import { Flex, Typography, Image, Divider, Button, ConfigProvider } from "antd";
import { FC } from "react";
import logo from '@/Public/JustTouch.svg';
import { useApp } from "@/Hooks/AppHook";
import { motion } from 'framer-motion';
import { useFramerMotion } from "@/Hooks/MotionHook";

const { Text, Title } = Typography;

export const EmailConfirmation: FC = () => {
    const { isLarge } = useApp();
    const { fadeUp } = useFramerMotion();

    return (
        <ConfigProvider theme={{
            components: {
                Typography: {
                    fontSizeHeading1: isLarge ? 50 : 30,
                    fontSize: isLarge ? 20 : 15
                }
            }
        }}>
            <div className="email-confirmation">
                <motion.div variants={fadeUp} custom={.1} initial="hidden" animate="show" exit="exit">
                    <Flex vertical align="center" gap={10}>
                        <Title level={1}>¡Ya casi!</Title>
                        <Divider style={{ backgroundColor: 'white' }} />
                        <Text> Este ultimo paso es importante para poder disponer de nuestro servicio.
                            Completa los datos de <b>usuario</b> - <b>razón social</b> - <b>establecimientos</b>
                        </Text>
                        <Text>Confirma tu Email y completa la informacion en tu cuenta.</Text>
                        <Image src={logo} style={{ width: 150 }} />
                        <Button color="primary" variant="solid">Acceder</Button>
                    </Flex>
                </motion.div>
            </div>
        </ConfigProvider>
    )
}