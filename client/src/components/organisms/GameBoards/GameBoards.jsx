import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentlyFocusedCell, replaceGame } from 'redux/actions/games';
import {
   getCurrentlyPlayedType,
   getCurrentlyPlayedInstance,
} from 'redux/reducers/games';
import Cell from 'components/molecules/Game/GameCell';
import games from 'games';
import { useEffect } from 'react';

function BoxSudokuTypeBoard({
   calculateCellClassnames,
}) {
   const game = useSelector(getCurrentlyPlayedInstance);
   useEffect(() => {
      console.log('rerendering')
   }, [game.playingBoard])
   const currentlyPlayedType = useSelector(getCurrentlyPlayedType);
   const dispatch = useDispatch();
   const seed = game.seed;
   const playingBoard = game.playingBoard;

   const moveFocus = (row, col) => {
      if (
         row < 0 ||
         col < 0 ||
         row >= playingBoard.length ||
         col >= playingBoard.length
      ) {
         return;
      }
      dispatch(setCurrentlyFocusedCell(row, col));
   };

   const calculateSizeStyles = () => {
      const size = `${45 * playingBoard.length}px`;
      const rowHeight = `${100.0 / playingBoard.length}%`;
      return {
         container: {
            maxHeight: size,
            maxWidth: size,
         },
         row: {
            width: '100%',
            height: rowHeight,
         },
         cell: {
            width: rowHeight,
            height: '100%',
         },
      };
   };

   const sizeStyles = calculateSizeStyles();

   const setCellValue = (row, col, value) => {
      playingBoard[row][col] = value;
      games[currentlyPlayedType].fillInvalidGrid(game);
      dispatch(replaceGame(currentlyPlayedType, game));
      // dispatch(setCurrentlyFocusedCell(row, col));
   };
   console.log(game);
   return (
      <div className='game-container' style={sizeStyles.container}>
         {playingBoard.map((rowValue, row) => {
            return (
               <div className='game-row' style={sizeStyles.row}>
                  {rowValue.map((cellValue, col) => {
                     return (
                        <Cell
                           style={sizeStyles.cell}
                           className={calculateCellClassnames(row, col)}
                           isEditable={seed[row][col] === -1}
                           row={row}
                           col={col}
                           shouldFocus={
                              game.currentlyFocusedCell.row === row &&
                              game.currentlyFocusedCell.col === col
                           }
                           value={playingBoard[row][col]}
                           maxNumber={playingBoard.length}
                           isInvalid={game.invalidGrid[row][col]}
                           moveFocus={moveFocus}
                           setCellValue={setCellValue}
                        />
                     );
                  })}
               </div>
            );
         })}
      </div>
   );
}

const boxDownBorderClassName = (boxRowCount, row, playingBoardLength) => {
   return (row + 1) % boxRowCount === 0 && row + 1 !== playingBoardLength
      ? 'box-down-border'
      : '';
};

const boxRightBorderClassName = (boxColCount, col, playingBoardLength) => {
   return (col + 1) % boxColCount === 0 && col + 1 !== playingBoardLength
      ? 'box-right-border'
      : '';
};

const jigsawDownBorderClassName = (row, col, areaPointersGrid, playingBoardLength) => {
   return row + 1 < playingBoardLength && areaPointersGrid[row][col] !== areaPointersGrid[row + 1][col]
      ? 'box-down-border'
      : '';
};

const jigsawRightBorderClassName = (row, col, areaPointersGrid, playingBoardLength) => {
   return col + 1 < playingBoardLength && areaPointersGrid[row][col] !== areaPointersGrid[row][col + 1]
      ? 'box-right-border'
      : '';
};

const backgroundHighlight = (row, col, playingBoardLength) => {
   return row === col || row + col + 1 === playingBoardLength
      ? 'diagonal-highlight'
      : '';
};

export function ClassicGameBoard() {
   const game = useSelector(getCurrentlyPlayedInstance);

   const calculateCellClassnames = (row, col) => {
      return `${boxDownBorderClassName(
         game.boxRowCount,
         row,
         game.playingBoard.length
      )} ${boxRightBorderClassName(game.boxColCount, col, game.playingBoard.length)}`;
   };
   return (
      <BoxSudokuTypeBoard
         calculateCellClassnames={calculateCellClassnames}
      />
   );
}

export function ClassicXGameBoard() {
   const game = useSelector(getCurrentlyPlayedInstance);
   const calculateCellClassnames = (row, col) => {
      return `${boxDownBorderClassName(
         game.boxRowCount,
         row,
         game.playingBoard.length
      )} ${boxRightBorderClassName(game.boxColCount, col, game.playingBoard.length)} ${backgroundHighlight(row, col, game.playingBoard.length)}`;
   };
   return <BoxSudokuTypeBoard calculateCellClassnames={calculateCellClassnames}/>;
}

export function JigsawGameBoard() {
   const game = useSelector(getCurrentlyPlayedInstance);
   const calculateCellClassnames = (row, col) => {
      return `${jigsawDownBorderClassName(row, col, game.areaPointersGrid, game.playingBoard.length)} ${jigsawRightBorderClassName(row, col, game.areaPointersGrid, game.playingBoard.length)}`;
   };
   return <BoxSudokuTypeBoard calculateCellClassnames={calculateCellClassnames}/>;
}
