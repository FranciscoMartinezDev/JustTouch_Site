import { CSSProperties, FC } from "react";
import { Card, Divider, Input, Grid } from "antd";
import { Page } from "@/Pages/Page";
import { HeadActions } from "@/Components/HeadActions";
import { useApp } from "@/Hooks/AppHook";
import './Account.scss';

const { useBreakpoint } = Grid;

export const Account: FC = () => {

    return (
        <Page HeadTitle="Editar perfil"
            Actions={<HeadActions />}
            Body={
                <div className="account">
                    <UserData />
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


