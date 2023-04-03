import React, { useState } from 'react';
import { Box, Button, Divider, TextField, Typography} from "@mui/material"
import { useLiveQuery } from 'dexie-react-hooks';
import localforage from 'localforage';
import { useNavigate } from 'react-router-dom';
import { User } from '../../models/User';
import { userStore } from '../../services/db/hooks/useUsers.hook';
import { UsersListView } from './UsersListView';

export const Login = () => {
    const [newUser, setNewUser] = useState('');
    const navigate = useNavigate();
    const users = useLiveQuery(() => {
        return userStore.users.toArray();
    });
    const onClick = async () => {
        const [firstName, lastName] = newUser.split(' ');
        const user = new User(firstName, lastName, 18, 'male');
        await user.save();
        await localforage.setItem('current user', user.fullName);
        navigate('/');
    }
    return (
        <Box display='flex' flexDirection='column' minWidth='100%' border='2px solid green' justifyContent='center' alignItems='center' sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Box>
                <Typography variant='h4'>
                    Please Login 
                </Typography>
                <Divider light variant='fullWidth'/>
            </Box>
            <Box display='flex' flexDirection='row'>
                <TextField value={newUser} onChange={(e) => setNewUser(e.currentTarget.value)} placeholder='please enter your name' />
                <Button variant='outlined' onClick={onClick}>login</Button>
            </Box>
                <UsersListView users={users} onClick={setNewUser} />
        </Box>
    );
}