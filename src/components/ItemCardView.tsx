import React, { useState } from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Divider, Menu, MenuItem, Select, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { Todo } from '../services/DatabaseService';
import { uuid } from '../utils/uuid';
import { ITodoItem, ITodoCategory } from '../services/types';
import { DescriptionRounded, KeyboardArrowDownTwoTone, SwipeRightAltTwoTone } from '@mui/icons-material';
import { truncate } from '../utils/utils';

export const ItemCardView = (props: { id: string, title: string, description: string, categoryName: string }) => {
    const { id, title, categoryName, description } = props;
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
            <Card sx={{ maxWidth: 275, minWidth: 160, minHeight: 75, m: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, overflow:'visible' }} key={id}>
                <CardContent>{title}</CardContent>
                <Divider variant='middle' flexItem sx={{position: 'absolute', left:0, zIndex: 2, rotate: '-90deg', translate: '-100%', color:'purple', borderBottom: '2px double blueviolet', textTransform: 'uppercase', fontFamily: 'monospace', letterSpacing: '2px', backgroundColor: 'InfoBackground'}} >{categoryName}</Divider>
                
                <Box>
                    <Box>
                        <Typography variant='caption' color='GrayText' display='flex' alignItems='center' gap={1}>
                            <DescriptionRounded fontSize='small'/>
                            Description
                        </Typography>
                    </Box>
                    <Box sx={{overflow: 'hidden', mt: 1}} display='flex' alignItems='center' justifyContent='center' minWidth='calc(100% - 2rem)' textOverflow='ellipsis' maxHeight='100px'>
                        <Typography variant='body2' fontSize='small' color='InactiveCaptionText' sx={{textTransform:'capitalize'}}>
                            {description.length > 0 ? truncate(description) : 'none'}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                        <Button  onClick={handleClick}>
                            move to <KeyboardArrowDownTwoTone />
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