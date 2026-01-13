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

    const pushFranchise = () => {
        handler(prev => ({
            ...prev,
            franchises: [...prev.franchises, new Franchise()]
        }))
    }

    const handlerFranchise = <K extends keyof Franchise>(key: K, value: any, index: number) => {
        handler(prev => ({
            ...prev,
            franchises: prev.franchises.map((item, i) => i == index ? { ...item, [key]: value } : item)
        }))
    }

    const handleBranch = <K extends keyof Branch>(key: K, value: any, findex: number, bindex: number) => {
        handler(prev => ({
            ...prev,
            franchises: prev.franchises.map((fr, f) => f === findex ?
                {
                    ...fr, branches: fr.branches.map((br, b) =>
                        b === bindex ? { ...br, [key]: value } : br)
                } : fr)
        }))
    }

    return {
        handleUser,
        handlerFranchise,
        handleBranch,
        pushFranchise,
        validPassword
    }
}