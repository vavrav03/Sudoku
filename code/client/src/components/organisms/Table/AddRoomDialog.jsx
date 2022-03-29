import React from "react";
import {Add as AddIcon} from "@mui/icons-material";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip} from "@mui/material";

const AddRoomDialog = ({attemptPostRoom}) => {
   const [meetingTime, setMeetingTime] = React.useState();
   const [open, setOpen] = React.useState(false);

   const handleMeetingTImeChange = (e) => {
      setMeetingTime(e.target.value);
   }

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleAdd = (event) => {
      // attemptPostRoom(meetingTime);
      setOpen(false);
   };

   return (
      <div>
         <Tooltip title="Add">
            <IconButton aria-label="add" onClick={handleClickOpen}>
               <AddIcon />
            </IconButton>
         </Tooltip>
         <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create room</DialogTitle>
            <DialogContent>
               <TextField
                  id="datetime-local"
                  label="Next appointment"
                  type="datetime-local"
                  InputLabelProps={{
                     shrink: true,
                  }}
                  value={meetingTime}
                  onChange={handleMeetingTImeChange}
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  Cancel
               </Button>
               <Button onClick={handleAdd} color="primary">
                  Add
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};

AddRoomDialog.propTypes = {
   // addUserHandler: PropTypes.func.isRequired,
};

export default AddRoomDialog;
