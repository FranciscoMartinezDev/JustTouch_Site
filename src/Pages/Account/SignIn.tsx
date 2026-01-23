import { Button, Card, Col, Flex, Input, Row, Typography, Image, Select } from "antd";
import { FC } from "react";
const { Text, Title, Link } = Typography;
import logo from '@/Public/JustTouch.svg';
import { useApp } from "@/Hooks/AppHook";
import { useFramerMotion } from "@/Hooks/MotionHook";
import { motion } from 'framer-motion';
import { useAuthenticationContext } from "@/Context/AuthenticationContext";
import './Account.scss';


export const SignIn: FC = () => {
    const { branchSelector } = useAuthenticationContext();
    const { bounceIn } = useFramerMotion();
    const { isLarge } = useApp();

    return (
        <div className="sign-in-container">
            <Row>
                <Col xxl={{ span: 6, offset: 9 }}
                    xl={{ span: 10, offset: 7 }}
                    lg={{ span: 16, offset: 4 }}
                    md={{ span: 16, offset: 4 }}
                    sm={{ span: 16, offset: 4 }}
                    xs={{ span: 20, offset: 2 }}>
                    <motion.div variants={bounceIn} initial="hidden" animate="show" exit="exit">
                        <Card className="sign-in" title={
                            <motion.div variants={bounceIn} custom={.15} initial="hidden" animate="show" exit="exit">
                                <div className="sign-in-header">
                                    <Image src={logo} style={{ width: isLarge ? 150 : 100 }} />
                                    <Title level={3} style={{ margin: 0, textAlign: 'center', color: 'gray' }}>¡Bienvenid@!</Title>
                                </div>
                            </motion.div>
                        }>
                            {!branchSelector ? <SignInForm /> : < BranchSelector />}
                        </Card>
                    </motion.div>
                </Col>
            </Row>
        </div>
    )
}

const SignInForm: FC = () => {
    const { fadeUp } = useFramerMotion();

    return (
        <>
            <Flex vertical gap={20}>
                <motion.div variants={fadeUp} custom={.3} initial="hidden" animate="show" exit="exit">
                    <Flex vertical gap={5}>
                        <Text>Email</Text>
                        <Input placeholder="E-mail..." />
                    </Flex>
                </motion.div>
                <motion.div variants={fadeUp} custom={.45} initial="hidden" animate="show" exit="exit">
                    <Flex vertical gap={5}>
                        <Text>Contraseña</Text>
                        <Input placeholder="Contraseña..." type={'password'} />
                    </Flex>
                </motion.div>
                <motion.div variants={fadeUp} custom={.6} initial="hidden" animate="show" exit="exit">
                    <Button style={{ backgroundColor: '#00A8E8', color: 'white', width: '100%' }} variant="solid"><p>Ingresar</p></Button>
                </motion.div>
                <motion.div variants={fadeUp} custom={.6} initial="hidden" animate="show" exit="exit">
                    <p style={{ margin: 0, textAlign: 'center' }}>Si no eres cliente, solicita tu servicio <Link href="/service-request">Aqui.</Link> </p>
                </motion.div>
            </Flex>
        </>
    )
}

const BranchSelector: FC = () => {
    const { fadeUp } = useFramerMotion();

    return (
        <>
            <Flex vertical gap={20}>
                <motion.div variants={fadeUp} custom={.3} initial="hidden" animate="show" exit="exit">
                    <Flex vertical gap={5}>
                        <Text>Negocio</Text>
                        <Select placeholder="Franquicia"
                            options={[
                                { value: 'prueba 1', label: 'prueba 1' },
                                { value: 'prueba 2', label: 'prueba 2' },
                                { value: 'prueba 3', label: 'prueba 3' },
                                { value: 'prueba 4', label: 'prueba 4' },
                            ]} />
                    </Flex>
                </motion.div>
                <motion.div variants={fadeUp} custom={.45} initial="hidden" animate="show" exit="exit">
                    <Flex vertical gap={5}>
                        <Text>Sucursal</Text>
                        <Select placeholder="Franquicia"
                            options={[
                                { value: 'prueba 1', label: 'prueba 1' },
                                { value: 'prueba 2', label: 'prueba 2' },
                                { value: 'prueba 3', label: 'prueba 3' },
                                { value: 'prueba 4', label: 'prueba 4' },
                            ]} />
                    </Flex>
                </motion.div>
                <motion.div variants={fadeUp} custom={.6} initial="hidden" animate="show" exit="exit">
                    <Button style={{ backgroundColor: '#00A8E8', color: 'white', width: '100%' }} variant="solid"><p>Ingresar</p></Button>
                </motion.div>
            </Flex>
        </>
    )
}