import React, { useState } from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Divider, Menu, MenuItem, Select } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { Todo } from '../services/DatabaseService';
import { uuid } from '../utils/uuid';
import { ITodoItem, ITodoCategory } from '../services/types';

export const ItemCardView = (props: { id: string, title: string, categoryName: string }) => {
    const { id, title, categoryName } = props;
    const categories = useLiveQuery(() => {
        return Todo.db.categories.toArray();
    });
    // const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    const onSelect = (title: string, category: string) => async () => {
        setAnchorEl(null);
        const item = await Todo.db.todoItems.where({ title }).first();
        const newCategory: ITodoCategory = {id: uuid(), name: category}
        if(item) Todo.db.todoItems.put({...item, category: newCategory});
    }
    return (
        <Box>
            <Card sx={{ maxWidth: 275, minWidth: 160, minHeight: 75, m: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }} key={id}>
                <CardContent>{title}</CardContent>
                <Divider variant='middle' flexItem sx={{position: 'absolute', left:0, zIndex: 2, rotate: '-90deg', translate: '-50%', color:'purple', borderBottom: '2px double blueviolet', textTransform: 'uppercase', fontFamily: 'monospace', letterSpacing: '2px'}} >{categoryName}</Divider>
                <Box>
                        <Button  onClick={handleClick}>
                            category
                        </Button>
                    <Menu open={open} sx={{ border: 'none' }} anchorEl={anchorEl} onClose={handleClose}>
                            {(categories || []).map((category) => {
                                return <MenuItem value={category.name} key={category.id} onClick={onSelect(title, category.name)}>{category.name}</MenuItem>
                            })}
                        </Menu>
                </Box>
            </Card>
        </Box>
    )
}