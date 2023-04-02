import React from 'react'
import { SnackbarProvider } from 'notistack';
import { Box } from '@mui/material'
import { Todo } from './services/DatabaseService'
import { TodoItem } from './services/TodoItem'
import { NewTodoItem } from './components/NewTodoItem';
import { TodoListView } from './components/TodoListView';

function App() {
  // Todo.db.todoItems.add(TodoItem.create('new item', 'new description'));

  return (
    <SnackbarProvider maxSnack={3} SnackbarProps={{}} preventDuplicate autoHideDuration={4000} iconVariant={{
      success: '✅',
      error: '✖️',
      warning: '⚠️',
      info: 'ℹ️',
    }}>
      <Box>
        <NewTodoItem />
        <TodoListView />
      </Box>
    </SnackbarProvider>
  );
}

export default App
