import { db } from "@/Database/Database";
import { FC, useEffect, useState } from "react";
import Cookie from 'js-cookie';

import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthenticationContext } from "@/Context/AuthenticationContext";
import { Loading } from "@/Components/Loading";

export const GateKeeper: FC = () => {
    const { DetectBranch } = useAuthenticationContext();
    const location = useLocation();

    var token = Cookie.get('JToken');

    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState<string | null>(null);

    const checkAccess = async () => {
        const currentPath = location.pathname;

        if (!token) {
            if (currentPath.includes('/email-confirm') || currentPath.includes('/service-request')) {
                setLoading(false);
                return <Outlet />
            }
        }


        if (!token) {
            DetectBranch(false);
            if (currentPath !== '/sign-in') {
                setRedirect('/sign-in');
            } else {
                setRedirect(null);
                setLoading(false);
            }
            return;
        }

        const branches = await db.accountData.get(1);
        const account = await db.authData.get(1);
        const hasBranches = branches?.franchises?.some(x => x.branches.length > 0) ?? false;

        if (token && !hasBranches && account?.BranchCode == null) {
            if (currentPath !== '/account') {
                setRedirect("/account");
            } else {
                setRedirect(null);
                setLoading(false);
            }
            return;
        }

        if (token && hasBranches && account?.BranchCode == null) {
            DetectBranch(true);
            if (currentPath !== '/sign-in') {
                setRedirect('/sign-in');
            } else {
                setRedirect(null);
                setLoading(false);
            }
            return;
        }

    }

    useEffect(() => {
        checkAccess();
    }, [token, location.pathname])

    if (redirect) return <Navigate to={redirect} />;
    if (loading) return <Loading />;

    return <Outlet />;
}