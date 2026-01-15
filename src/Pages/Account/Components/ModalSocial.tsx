import { useAccountContext } from "@/Context/AccountContext";
import { Modal } from "antd";
import { FC } from "react";

export const ModalSocial: FC = () => {
    const { } = useAccountContext();

    return (
        <Modal title="Contactos" footer={null}>

        </Modal>
    )
}