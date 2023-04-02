import localforage from 'localforage';
import React, { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Authenticator: React.FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        (async () => { 
            const currentUser = await localforage.getItem('current user');
            if(!currentUser) navigate('/login')
        })();
    }, [])
    return <>{children}</>
}