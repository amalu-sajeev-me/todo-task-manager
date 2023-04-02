import React, { useState } from 'react';
import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemButton, TextField, Typography } from "@mui/material"
import { useLiveQuery } from 'dexie-react-hooks';
import { Todo } from '../services/DatabaseService';
import { uuid } from '../utils/uuid';
import localforage from 'localforage';
import { useNavigate } from 'react-router-dom';
import { ArrowRightAltOutlined, ArrowRightOutlined, Person4Outlined, VerifiedUserRounded } from '@mui/icons-material';

export const Login = () => {
    const [newUser, setNewUser] = useState('');
    const navigate = useNavigate();
    const users = useLiveQuery(() => {
        return Todo.db.users.toArray();
    });
    const onClick = () => {
        Todo.db.users.add({ id: uuid(), fullName: newUser }).finally(async () => {
            await localforage.setItem('current user', newUser);
            navigate('/');
        });
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
            <List>
                {(users || []).map(user => {
                    return (
                        <ListItem disablePadding sx={{ minWidth: 300 }} key={user.id} onClick={()=>{setNewUser(user.fullName)}}>
                            {/* <Avatar><VerifiedUserRounded/></Avatar> */}
                            <ListItemButton >
                                <Person4Outlined />
                                {user.fullName}
                            </ListItemButton>
                            <IconButton><ArrowRightOutlined/></IconButton>
                            <Divider variant='inset' light />
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    );
}