import { useAccountContext } from "@/Context/AccountContext";
import { useAccount } from "@/Hooks/AccountHook";
import { Branch } from "@/Models/Branch";
import { Button, Flex, Input, Modal } from "antd";
import { FC, useEffect, useState } from "react";

export const ModalSocial: FC = () => {
    const { handleBranch } = useAccount();
    const { account, selectedFranchise, selectedBranch, socialModal, closeModal } = useAccountContext();
    const [branch, setBranch] = useState<Branch>(new Branch({ instagramUrl: '', facebookUrl: '', whatsappUrl: '' }));

    useEffect(() => {
        if (selectedBranch != undefined) {
            setBranch(account.franchises[selectedFranchise!].branches[selectedBranch!])
        }
    }, [account])

    return (
        <Modal title="Contactos" footer={null} closable={false} open={socialModal}>
            <Flex vertical gap={10}>
                <Input placeholder="Perfil de Instagram..."
                    onChange={e => handleBranch('instagramUrl', e.target.value, selectedFranchise!, selectedBranch!)}
                    value={branch!.instagramUrl || ''}
                />
                <Input placeholder="Pagina de Facebook..."
                    onChange={e => handleBranch('facebookUrl', e.target.value, selectedFranchise!, selectedBranch!)}
                    value={branch!.facebookUrl || ''}
                />
                <Input placeholder="Link de WhatsApp..."
                    onChange={e => handleBranch('whatsappUrl', e.target.value, selectedFranchise!, selectedBranch!)}
                    value={branch!.whatsappUrl || ''}
                />
                <Button color="cyan" variant="solid" onClick={() => closeModal('social')}>Hecho</Button>
            </Flex>
        </Modal>
    )
}