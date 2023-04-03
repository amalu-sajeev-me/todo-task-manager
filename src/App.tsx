import React from 'react'
import { SnackbarProvider } from 'notistack';
import { Box } from '@mui/material';
import { NewTodoItem } from './components/NewTodoItem';
import { TodoListView } from './components/TodoListView';
import { Authenticator } from './components/Authenticator';
import { AppbarMenu } from './components/AppbarMenu';
import { FailSafe } from './utils/FailSafe';

function App() {
  return (
    <SnackbarProvider maxSnack={3} SnackbarProps={{}} preventDuplicate autoHideDuration={4000} iconVariant={{
      success: '✅',
      error: '✖️',
      warning: '⚠️',
      info: 'ℹ️',
    }}>
      <FailSafe>
        <Authenticator>
          <Box display='block' overflow='hidden' minHeight='80%'>
            <NewTodoItem />
            <TodoListView />
          </Box>
          <AppbarMenu />
        </Authenticator>
      </FailSafe>
    </SnackbarProvider>
  );
}

export default App
