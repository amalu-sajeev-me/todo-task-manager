import localforage from 'localforage';
import React, { PropsWithChildren, useEffect, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { userStore } from '../services/db/hooks/useUsers.hook';
import { IUser } from '../schemas/user.schema';

export const UserContext = createContext<IUser | null>(null);
export const Authenticator: React.FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useState<IUser | null>(null);
    useEffect(() => {
        (async () => { 
            const currentUser = await localforage.getItem('current user') as string;
            const userInfo = currentUser? await userStore.get(currentUser): null;
            userInfo && setUser(userInfo);
            if (!currentUser) navigate('/login');
            console.log({userInfo, currentUser});
        })();
    }, [])
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}