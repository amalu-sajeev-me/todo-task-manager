import React, {useState} from 'react';
import { TextField, Box, Button, ButtonGroup } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Todo } from '../services/DatabaseService';
import { TodoItem } from '../services/TodoItem';
import { NewItemDialog } from './NewItemDialog';
import { Breadcrumbs } from './BreadCrumbs';

export const NewTodoItem: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const onAdd = () => {
        setDialogOpen(true);
    };
    const onCancel = () => { 
        setDialogOpen(false);
    };
    const handleClick = async () => {
        try {
            await Todo.db.todoItems.add(TodoItem.create(title, description));
            setTitle(''), setDescription('');
            enqueueSnackbar(`new Item ${title} has been added`, {variant: 'success'});
        } catch (error) {
            const message = error instanceof Error ? error.message : error as string;
            enqueueSnackbar(`Failed to add item, cause: ${message}`, {variant: 'error'});
        }
    }
    return (
        <Box display="flex" flexDirection="row" alignItems='center' gap={4}>
            <ButtonGroup>
                <TextField sx={{backgroundColor:'InfoBackground'}} placeholder='New Item' value={title} onChange={e=>setTitle(e.currentTarget.value)} />
                <Button variant='contained' onClick={onAdd}>Add</Button>
            </ButtonGroup>
            {/* <TextField multiline placeholder='Description' value={description} onChange={e=>setDescription(e.currentTarget.value)}/> */}
            <Breadcrumbs />
            <NewItemDialog onChange={(val: React.SetStateAction<string>)=> {setDescription(val)}} onCancel={onCancel} open={dialogOpen} itemName={title} onSave={handleClick} />
        </Box>
    );
}