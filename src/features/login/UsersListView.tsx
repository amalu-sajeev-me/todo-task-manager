import React from 'react';
import { Person4Outlined, ArrowRightOutlined } from '@mui/icons-material';
import { List, ListItem, ListItemButton, IconButton, Divider, Box } from '@mui/material';
import { IUser } from '../../schemas/user.schema';

interface IUsersListViewProps {
    users?: IUser[];
    onClick: (userName: string) => void;
}

export const UsersListView = (props: IUsersListViewProps) => {
    const {users, onClick} = props;
    return (
        <Box>
            <List>
                {(users || []).map(user => {
                    return (
                        <ListItem disablePadding sx={{ minWidth: 300 }} key={user.id} onClick={() => {onClick(user.firstName)}}>
                            <ListItemButton >
                                <Person4Outlined />
                                {user.firstName}
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