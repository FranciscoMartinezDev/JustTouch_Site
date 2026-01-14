import { useAccountContext } from "@/Context/AccountContext";
import { useAccount } from "@/Hooks/AccountHook";
import { TaxCategory } from "@/Models/Enums/TaxCategories";
import { Franchise } from "@/Models/Franchise";
import { Button, Col, Input, Modal, Row, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { FC, useState } from "react";

export const FranchiseModal: FC = () => {
    const { openFranchise, OpenFranchise, account, selectedFranchise } = useAccountContext();
    const { pushFranchise, editFranchise, removeFranchise } = useAccount();
    const [franchise, setFranchise] = useState<Franchise>(selectedFranchise ? account.franchises[selectedFranchise] : new Franchise());

    const handlerFranchise = <K extends keyof Franchise>(key: K, value: any) => setFranchise(prev => ({
        ...prev,
        [key]: value
    }))

    const options: DefaultOptionType[] = Array.from(Object.entries(TaxCategory).map((x) => {
        return { label: x[1], value: x[0] }
    }))
    const push = () => {
        if (selectedFranchise) {
            editFranchise(franchise, selectedFranchise);
            OpenFranchise();
            return;
        }
        pushFranchise(franchise);
        OpenFranchise();
    }

    return (
        <Modal title={`${selectedFranchise ? 'Editar' : 'Añadir'} Negocio`} open={openFranchise} footer={null}>
            <Row style={{ gap: 10}}>
                <Col lg={12}>
                    <Input placeholder="Nombre..."
                        onChange={e => handlerFranchise('fanstasyName', e.target.value)}
                        value={franchise.fanstasyName} />
                </Col>
                <Col lg={11}>
                    <Input placeholder="Razon social"
                        onChange={e => handlerFranchise('companyName', e.target.value)}
                        value={franchise.companyName} />
                </Col>
                <Col lg={12}>
                    <Input placeholder="CUIT..."
                        onChange={e => handlerFranchise('taxId', e.target.value)}
                        value={franchise.taxId} />
                </Col>
                <Col lg={11}>
                    <Select style={{ width: '100%' }} placeholder='Categoria fiscal...' options={options}
                        onChange={e => handlerFranchise('taxCategory', e)}
                        value={franchise.taxCategory} />
                </Col>
                {selectedFranchise != undefined ?
                    <Button variant="filled"
                        color="blue"
                        onClick={push}>Editar</Button>
                    :
                    <Col lg={24}>
                        <Button variant="filled"
                            color="blue"
                            style={{ width: '100%' }}
                            onClick={push}>Agregar</Button>
                    </Col>
                }
                {selectedFranchise ?
                    <Button variant="filled"
                        color="red"
                        onClick={() => removeFranchise(selectedFranchise)}>Quitar</Button>
                    : null}
            </Row>
        </Modal>
    )
}