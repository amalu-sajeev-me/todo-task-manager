import React, {FC, useState} from "react";
import { Box, Button, ButtonGroup, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useLiveQuery } from 'dexie-react-hooks';
import { uuid } from '../utils/uuid';
import { ItemCardView } from "./ItemCardView";
import { DeleteOutline } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { todoStore } from "../services/db/hooks/useTodo.hook";
import { categoryStore } from "../services/db/hooks/useCategory.hook";
import { Category } from "../models/Category.model";


export const TodoListView: FC = (props) => {
    const data = useLiveQuery(() => {
        return todoStore.todoItems.orderBy('id').sortBy('id')
    });
    const [newCategory, setNewCategory] = useState('');
    const categories = useLiveQuery(() => {
        return categoryStore.categories.toArray();
    });
    
    const onCreate = async () => {
        const category = new Category(newCategory, 0);
        await category.save();
        setNewCategory('');
    };
    const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { code } = event;
        if (code === 'Enter') {
            onCreate();
        }
    }
    const onDelete = (id: string)=> async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        await categoryStore.categories.delete(id);
        enqueueSnackbar('successfully removed category', {variant:'success'})
    };
    
    return data ? (
        <Box height={window.innerHeight - 100} display='flex' flexDirection='column'  sx={{overflow: 'scroll', border:'2px solid blue', scrollbarWidth: 2, scrollBehavior: 'smooth'}}>
            <Box display='flex' flexDirection='row'>
                <Table>
                    <TableRow>
                {(categories || []).map(category => {
                    return (
                        <TableCell align="center" valign="top" key={category.id} sx={{display: 'table-cell', verticalAlign: 'top'}}>
                            
                            <ButtonGroup color="secondary" variant="contained" sx={{'&:hover .delete': {color: 'red'}}}>
                                <Button fullWidth variant="contained" color="info">
                                    {category.categoryName}
                                </Button>
                                <IconButton color="warning" onClick={onDelete(category.id)} className="delete" sx={{borderRadius: 0}}><DeleteOutline /></IconButton>
                            </ButtonGroup>
                        <Box display='flex' flexDirection='column'>
                            {data.filter(item => item.category === category.categoryName).map(i => {
                                return (
                                    <ItemCardView description={i.description || ''} categoryName={category.categoryName} id="0" title={i.title} key={i.id} />
                                );
                        })}
                            </Box>
                        </TableCell>
                    )
                })}
                        <TableCell sx={{ display: 'table-cell', verticalAlign: 'top' }}>
                            <Box display='flex' flexDirection='row'>
                                <TextField sx={{ minWidth: 122 }} variant="outlined" placeholder="new category" value={newCategory} onChange={(e) => setNewCategory(e.currentTarget.value)} onKeyUp={onEnter} />
                                <Button variant="contained" onClick={onCreate}>create</Button>
                            </Box>
                        </TableCell>
                    </TableRow>
                </Table>
            </Box>        
                            
        </Box>
  ): null;
};