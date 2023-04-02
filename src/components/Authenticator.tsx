import localforage from 'localforage';
import React, { PropsWithChildren, useEffect, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../services/types';
import { Todo } from '../services/DatabaseService';
import { useSnackbar } from 'notistack';

export const UserContext = createContext<IUser | null>(null);
export const Authenticator: React.FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useState<IUser | null>(null);
    useEffect(() => {
        (async () => { 
            try {
                const currentUser = await localforage.getItem('current user') as string;
                const userInfo = (await Todo.db.users.where({fullName: currentUser}).first()) || null
                console.log('lolol', {currentUser, userInfo})
                setUser(userInfo);
                if (!currentUser) navigate('/login');
            } catch (err) { 
                enqueueSnackbar(err instanceof Error ? err.message : err as string, { variant: 'error' });
                navigate('/login');
            }
        })();
    }, [])
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}