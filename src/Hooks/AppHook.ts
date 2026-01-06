import { useState } from 'react'


export const useApp = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const changeCollaped = () => setCollapsed(!collapsed);


    return {
        collapsed,
        changeCollaped
    }
}