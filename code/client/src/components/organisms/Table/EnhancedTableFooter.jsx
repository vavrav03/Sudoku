import React from 'react';
import PropTypes from 'prop-types';
import {
   FirstPage as FirstPageIcon,
   KeyboardArrowLeft,
   KeyboardArrowRight,
   LastPage as LastPageIcon,
} from '@mui/icons-material';

import {
   IconButton,
   MenuItem,
   Select,
} from '@mui/material';

const EnhancedTableFooter = ({ tableProps }) => {
   const pageSizePossibilities = [10, 20, 30];
   const {
      data,
      gotoPage,
      setPageSize,
      state: { pageIndex, pageSize },
   } = tableProps;
   const from = (pageIndex) * pageSize + 1;
   const to = Math.min((pageIndex + 1) * pageSize, data.length);

   const handleChangeRowsPerPage = (event) => {
      setPageSize(Number(event.target.value));
   };

   const handleFirstPageButtonClick = (event) => {
      gotoPage(0);
   };

   const handleBackButtonClick = (event) => {
      gotoPage(pageIndex - 1);
   };

   const handleNextButtonClick = (event) => {
      gotoPage(pageIndex + 1);
   };

   const handleLastPageButtonClick = (event) => {
      gotoPage(Math.max(0, Math.ceil(data.length / pageSize) - 1));
   };

   return (
      <div className='footer'>
         <Select
            id='demo-simple-select-helper'
            value={pageSize}
            label='Page size'
            onChange={handleChangeRowsPerPage}
            variant="standard"
         >
            {pageSizePossibilities.map((value) => {
               return (<MenuItem key={value} value={value}>{value}</MenuItem>)
            })}
         </Select>
         <div className='pagination-counter'>
            {from}-{to} of {data.length}
         </div>
         <div className={'table-pagination'}>
            <IconButton
               aria-label='first page'
               disabled={pageIndex === 0}
               onClick={handleFirstPageButtonClick}
            >
               <FirstPageIcon />
            </IconButton>
            <IconButton
               aria-label='previous page'
               onClick={handleBackButtonClick}
               disabled={pageIndex === 0}
            >
            <KeyboardArrowLeft />
            </IconButton>
            <IconButton
               onClick={handleNextButtonClick}
               disabled={pageIndex >= Math.ceil(data.length / pageSize) - 1}
               aria-label='next page'
            >
            <KeyboardArrowRight />
            </IconButton>
            <IconButton
               disabled={pageIndex >= Math.ceil(data.length / pageSize) - 1}
               onClick={handleLastPageButtonClick}
               aria-label='last page'
            >
            <LastPageIcon />
            </IconButton>
         </div>
      </div>
   );
};

export default EnhancedTableFooter;
export { EnhancedTableFooter };
