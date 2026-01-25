import { User } from "@/Models/User";

export interface IAuthContext {
    serviceRequested: boolean;
    branchSelector: boolean;
    requesting: boolean;
    user: User;
    handleUser: <K extends keyof User>(key: K, value: any) => void;
    ConfirmAccount: (email: string) => void;
    RequestService: () => void;
    DetectBranch: (value: boolean) => void;
}