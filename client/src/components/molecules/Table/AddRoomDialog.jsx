import React from "react";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { connect } from "react-redux";

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
                  // className={classes.textField}
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

const mapDispatchToProps = (dispatch) => {
   // return {
   //    attemptPostRoom: (textDateValue) =>
   //       dispatch(attemptPostRoom(new Date(textDateValue))),
   // };
};

export default connect(null, mapDispatchToProps)(AddRoomDialog);
