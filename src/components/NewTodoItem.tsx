import React, {useState} from 'react';
import { TextField, Box, Button, ButtonGroup } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import Z from 'zod';
import { TodoItem } from '../services/TodoItem';
import { NewItemDialog } from './NewItemDialog';
import { Breadcrumbs } from './BreadCrumbs';
import { useTodo } from '../services/db/hooks/useTodo.hook';

export const NewTodoItem: React.FC = () => {
    const {add: addTodoItem} = useTodo();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const { register, handleSubmit, formState, watch } = useForm({
        mode: 'onChange', resolver: zodResolver(Z.string())});
    const onAdd = () => {
        setDialogOpen(true);
        handleSubmit((data) => {
            console.log('lolo', { data });
        });
        console.log(watch())
    };
    const onCancel = () => { 
        setDialogOpen(false);
    };
    const handleClick = async () => {
        await addTodoItem(TodoItem.create(title, description), {message:`new Item ${title} has been added`})
        setTitle(''), setDescription('');
    }
    return (
        <Box display="flex" flexDirection="row" alignItems='center' gap={4}>
            <ButtonGroup>
                <TextField {...register('itemName', {required: true})} sx={{backgroundColor:'InfoBackground'}} placeholder='New Item' value={title} onChange={e=>setTitle(e.currentTarget.value)} />
                <Button variant='contained' onClick={onAdd}>Add</Button>
            </ButtonGroup>
            <Breadcrumbs />
            <NewItemDialog onChange={(val: React.SetStateAction<string>)=> {setDescription(val)}} onCancel={onCancel} open={dialogOpen} itemName={title} onSave={handleClick} />
        </Box>
    );
}