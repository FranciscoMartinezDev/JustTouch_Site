import { UploadPictureCard } from "@/Components/UploadPictureCard";
import { useAccountContext } from "@/Context/AccountContext";
import { useAccount } from "@/Hooks/AccountHook";
import { Button, Flex, Modal, UploadFile } from "antd";
import { FC, useEffect, useState } from "react";

export const PictureModal: FC = () => {
    const { selectedFranchise, selectedBranch, account, pictureModal, closeModal } = useAccountContext();
    const { handleBranch } = useAccount();
    const [tempPicture, setTempPicture] = useState<UploadFile[]>([]);
    const [tempCover, setTempCover] = useState<UploadFile[]>([]);

    const handlePicture = (value: UploadFile[]) => {
        setTempPicture(value);
        handleBranch('pictureFile', value, selectedFranchise!, selectedBranch!)
    }

    const handleCover = (value: UploadFile[]) => {
        setTempCover(value);
        handleBranch('coverFile', value, selectedFranchise!, selectedBranch!)
    }
    const branch = selectedFranchise !== undefined && selectedBranch !== undefined ?
        account.franchises[selectedFranchise].branches[selectedBranch] :
        null;

    useEffect(() => {
        if (pictureModal && branch) {
            setTempPicture(branch.pictureFile || []);
            setTempCover(branch.coverFile || []);
        }
    }, [branch]);


    return (
        <Modal title="Portadas" open={pictureModal} closable={false} footer={null}>
            <Flex vertical gap={20}>
                <UploadPictureCard
                    value={tempPicture}
                    change={handlePicture}
                    style={{ width: '100%' }} />
                <Flex align="center" gap={20}>
                    <UploadPictureCard
                        value={tempCover}
                        change={handleCover}
                        style={{ borderRadius: '50%' }} />
                    <p style={{ color: 'gray' }}>Seleccione y cargue las fotos de portada para el menu de esta sucurcal</p>
                </Flex>
                <Button onClick={() => {
                    closeModal('picture')
                }} color="cyan" variant="solid">Hecho</Button>
            </Flex>
        </Modal>
    )
}