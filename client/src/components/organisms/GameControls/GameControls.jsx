import React from 'react';
import { Button } from '@mui/material';

function GameControls({ rowCount, colCount, currentNumber, helpNumbers }) {
   const fillButtonClick = (row, col, number) => {
      //TODO dispatch(row, col, number)
   };

   const probableButtonClick = (row, col, number) => {
      if (currentNumber.length !== 0) {
         return;
      }
      //TODO dispatch(row, col, number)
   };

   const createFillButtons = () => {
      const rows = [];
      for (let i = 0; i < rowCount; i++) {
         const cols = [];
         for (let j = 0; j < colCount; j++) {
            const number = rowCount * i + j + 1;
            cols.push(
               <Button
                  variant={'contained'}
                  onClick={(e) => {
                     fillButtonClick(i, j, number);
                  }}
                  className={`${
                     currentNumber === number ? 'active' : ''
                  } sure-number-button`}
               >
                  {number}
               </Button>
            );
         }
         rows.push(<div className='number-row'>{cols}</div>);
      }
      return rows;
   };

   const createProbableButtons = () => {
      const rows = [];
      for (let i = 0; i < rowCount; i++) {
         const cols = [];
         for (let j = 0; j < colCount; j++) {
            const number = rowCount * i + j + 1;
            cols.push(
               <Button
                  variant={'outlined'}
                  color={'primary'}
                  onClick={(e) => {
                     probableButtonClick(i, j, number);
                  }}
                  className={`${
                     helpNumbers.includes(number) ? 'active' : ''
                  } possible-number-button`}
               >
                  {number}
               </Button>
            );
         }
         rows.push(<div className='number-row'>{cols}</div>);
      }
      return rows;
   };

   return (
      <div className='fill-controllers-container'>
         <div className='headline'>Fill</div>
         <div className='sure-numbers-container'>{createFillButtons()}</div>
         <div className='headline'>Probable</div>
         <div className='fill-numbers-container'>{createProbableButtons()}</div>
         <button className='clear-button'>Delete</button>
      </div>
   );
}

export default GameControls;
