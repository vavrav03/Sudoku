import React from 'react';
import PropTypes from 'prop-types';
import {
   Delete as DeleteIcon,
   Search as SearchIcon,
} from '@mui/icons-material';
import {
   IconButton,
   Toolbar,
   InputBase,
   InputAdornment,
   Tooltip,
   TextField,
} from '@mui/material';

const EnhancedTableToolbar = (props) => {
   const {
      numSelected,
      addUserHandler,
      deleteUserHandler,
      preGlobalFilteredRows,
      setGlobalFilter,
      globalFilter,
      addButton,
      headding,
   } = props;
   return (
      <Toolbar className='toolbar'>
         {/* {numSelected > 0 ? (
            <div>{numSelected} selected</div>
         ) : ( */}
            <div className='title'>{headding}</div>
         {/* )} */}

         {numSelected > 0 ? (
            <Tooltip title='Delete'>
               <IconButton aria-label='delete' onClick={deleteUserHandler}>
                  <DeleteIcon />
               </IconButton>
            </Tooltip>
         ) : (
            <TextField
               variant='standard'
               value={globalFilter || ''}
               onChange={(e) => {
                  setGlobalFilter(e.target.value || undefined);
               }}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position='start'>
                        <SearchIcon />
                     </InputAdornment>
                  ),
                  'aria-label': 'search',
               }}
               // label="type to search"
               placeholder={`type to search through ${
                  preGlobalFilteredRows.length
               } ${preGlobalFilteredRows.length == 1 ? 'record' : 'records'}`}
               className='search-bar'
            ></TextField>
         )}
      </Toolbar>
   );
};

EnhancedTableToolbar.propTypes = {
   numSelected: PropTypes.number.isRequired,
   addUserHandler: PropTypes.func.isRequired,
   deleteUserHandler: PropTypes.func.isRequired,
   setGlobalFilter: PropTypes.func.isRequired,
   preGlobalFilteredRows: PropTypes.array.isRequired,
   globalFilter: PropTypes.string.isRequired,
};

export default EnhancedTableToolbar;
export { EnhancedTableToolbar };
