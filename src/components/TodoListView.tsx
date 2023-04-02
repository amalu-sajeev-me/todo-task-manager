import React, {FC, useEffect, useState, useReducer} from "react";
import { Box, Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { ReactSortable } from "react-sortablejs";
import { useLiveQuery } from 'dexie-react-hooks';
import { Todo } from '../services/DatabaseService';
import { ITodoItem } from "../services/types";
import { uuid } from '../utils/uuid';
import { ItemCardView } from "./ItemCardView";


export const TodoListView: FC = (props) => {
    const data = useLiveQuery(() => {
        return Todo.db.todoItems.orderBy('id').sortBy('id')
    });
    const [newCategory, setNewCategory] = useState('');
    const categories = useLiveQuery(() => {
        return Todo.db.categories.toArray();
     });
    const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { code } = event;
        if (code === 'Enter') {
            Todo.db.categories.add({ id: uuid(), name: newCategory });
            setNewCategory('');
        }
    }
    useEffect(() => {
        
    }, []);
    const mappedData = (data || []).map((item, index) => {
        return 
    })

    console.log('lolo', mappedData);
    return data ? (
        <Box display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='row' border='2px solid blue'>
                <Table>
                    <TableRow>
                {(categories || []).map(category => {
                    return (
                        <TableCell align="center" valign="top" key={category.id} sx={{display: 'table-cell', verticalAlign: 'top'}}>
                            <Button fullWidth variant="outlined">{category.name}</Button>
                        <Box display='flex' flexDirection='column'>
                            {data.filter(item => item.category.name === category.name).map(i => {
                                return (
                                    <ItemCardView categoryName={category.name} id="0" title={i.title} key={i.id} />
                                );
                        })}
                            </Box>
                        </TableCell>
                    )
                })}
                        <TableCell>
                                <TextField sx={{minWidth: 122}} variant="outlined" placeholder="new category" value={newCategory} onChange={(e)=> setNewCategory(e.currentTarget.value)} onKeyUp={onEnter} />
                        </TableCell>
                    </TableRow>
                </Table>
            </Box>        
                            
        </Box>
  ): null;
};