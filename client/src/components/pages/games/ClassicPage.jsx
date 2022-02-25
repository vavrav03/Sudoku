import GameSquare from 'components/molecules/Game/GameSquare';
import GameTemplate from 'components/templates/GameTemplate';
import React from 'react';
import { connect } from 'react-redux';

function ClassicEasyPage({ game }) {
   const gameRows = [];
   for (const row of game) {
      const rowSquares = [];
      for (const squareValue of row) {
         rowSquares.push(<GameSquare number={squareValue} ></GameSquare>);
      }
      gameRows.push(<div className='game-row'>{rowSquares}</div>);
   }
   return (
      <GameTemplate>
         <div className='container9x9 game-container'>{gameRows}</div>
      </GameTemplate>
   );
}

const mapStateToProps = (state) => {
   return {
      game: [
         [5, 3, null, null, 7, null, null, null, null],
         [6, null, null, 1, 9, 5, null, null, null],
         [null, 9, 8, null, null, null, null, 6, null],
         [8, null, null, null, 6, null, null, null, 3],
         [4, null, null, 8, null, 3, null, null, 1],
         [7, null, null, null, 2, null, null, null, 6],
         [null, 6, null, null, null, null, 2, 8, null],
         [null, null, null, 4, 1, 9, null, null, 5],
         [null, null, null, null, 8, null, null, 7, 9],
      ],
   };
};

export default connect(mapStateToProps)(ClassicEasyPage);
