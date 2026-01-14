import { useAccountContext } from "@/Context/AccountContext"
import { Branch } from "@/Models/Branch";
import { Franchise } from "@/Models/Franchise";
import { User } from "@/Models/User";

export const useAccount = () => {
    const { account, handler } = useAccountContext();

    const handleUser = <K extends keyof User>(key: K, value: string) => {
        handler(prev => ({
            ...prev,
            [key]: value
        }))
    }
    const validPassword = (): boolean => account.userData?.password === account.userData?.repeat;

    const pushFranchise = (newItem: Franchise) => handler(prev => {
        prev.franchises.push(newItem);
        return prev;
    })

    const editFranchise = (newItem: Franchise, index: number) => {
        handler(prev => (
            {
                ...prev,
                franchises: [...prev.franchises].map((item, i) => i === index ? newItem : item)
            }
        ))
    }

    const removeFranchise = (index: number) => {
        handler(prev => (
            {
                ...prev,
                franchises: [...prev.franchises].filter((_, i) => i !== index)
            }
        ))
    }

    const pushBranch = (index: number) => handler(prev => ({
        ...prev,
        franchises: prev.franchises.map((item, i) => i === index ? { ...item, branches: [...item.branches, new Branch()] } : item)
    }))

    const handleBranch = <K extends keyof Branch>(key: K, value: any, findex: number, bindex: number) => handler(prev => ({
        ...prev,
        franchises: prev.franchises.map((fr, f) => f === findex ?
            {
                ...fr, branches: fr.branches.map((br, b) =>
                    b === bindex ? { ...br, [key]: value } : br)
            } : fr)
    }))

    return {
        handleUser,
        handleBranch,
        pushFranchise,
        editFranchise,
        removeFranchise,
        pushBranch,
        validPassword
    }
}