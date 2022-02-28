import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

function GameCell({
   style,
   className,
   isEditable,
   value,
   row,
   col,
   shouldFocus,
   maxNumber,
   setCellValue,
   moveFocus,
   isInvalid
}) {
   const ref = useRef(null);
   useEffect(() => {
      // current property is refered to input element
      if (shouldFocus) {
         ref.current.focus();
         ref.current.select();
      }
   }, [shouldFocus]);
   // const handleFocus = (event) => event.target.select();
   const handleKeyDown = (e) => {
      switch (e.key) {
         case 'Backspace':
         case 'Delete':
            if (isEditable) {
               setCellValue(row, col, -1);
            }
            break;
         case 'ArrowUp':
            moveFocus(row - 1, col);
            break;
         case 'ArrowRight':
            moveFocus(row, col + 1);
            break;
         case 'ArrowDown':
            moveFocus(row + 1, col);
            break;
         case 'ArrowLeft':
            moveFocus(row, col - 1);
            break;
         default:
            try {
               const number = parseInt(e.key);
               if (isEditable && number > 0 && number <= maxNumber) {
                  setCellValue(row, col, number);
               }
            } catch (e) {
               console.log(e)
            }
      }
   };

   return (
      <input
         ref={ref}
         style={style}
         className={`game-cell ${!isEditable ? 'uneditable' : ''} ${className} ${isInvalid ? "invalid" : ""}`}
         onKeyDown={handleKeyDown}
         // onFocus={handleFocus}
         value={value !== -1 ? value : ''}
      ></input>
   );
}

export default GameCell;
