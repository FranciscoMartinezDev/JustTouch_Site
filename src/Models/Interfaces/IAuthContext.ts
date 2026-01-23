export interface IAuthContext {
    serviceRequested: boolean;
    branchSelector: boolean;
    requesting: boolean;
    RequestService: () => void;
    DetectBranch: (value: boolean) => void;
}