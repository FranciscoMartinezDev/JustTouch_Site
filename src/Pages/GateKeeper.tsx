import { db } from "@/Database/Database";
import { FC, useEffect, useState } from "react";
import Cookie from 'js-cookie';

import { Navigate, Outlet } from "react-router";
import { useAuthenticationContext } from "@/Context/AuthenticationContext";

export const GateKeeper: FC = () => {
    const { DetectBranch } = useAuthenticationContext();

    var token = Cookie.get('JToken');

    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState<string | null>(null);

    const checkAccess = async () => {
        if (!token) {
            DetectBranch(false);
            setRedirect('sign-in');
            return;
        }

        const branches = await db.accountData.get(1);
        const account = await db.authData.get(1);
        const hasBranches = branches?.franchises?.some(x => x.branches.length > 0) ?? false;

        if (!hasBranches && account?.BranchCode == null) {
            setRedirect("/account");
            return;
        }

        if (account?.BranchCode == null) {
            DetectBranch(true);
            setRedirect("/sign-in");
            return;
        }
        setLoading(false);
    }

    useEffect(() => {
        checkAccess();
    }, [token])

    if (redirect) return <Navigate to={redirect} replace />;
    if (loading) return <>Cargando...</>; // o spinner

    return <Outlet />;
}