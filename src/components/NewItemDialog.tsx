import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

export const NewItemDialog = (props: { open: boolean, itemName: string, onCancel: ()=> void, onSave: ()=>void, onChange: (val: string) => void }) => {
    const { open, itemName, onCancel, onSave, onChange } = props;

  return (
    <Box>
      <Dialog open={open}>
        <DialogTitle>Add a Description</DialogTitle>
        <DialogContent>
          <DialogContentText>
            here you can write more information about {itemName}, or you can skip this step and update the description later
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Item Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            placeholder='write description'
            onChange={(e)=> onChange(e.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={()=>{onCancel(), onSave() , onChange('')}}>save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}