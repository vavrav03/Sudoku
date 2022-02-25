import GameSquare from 'components/molecules/Game/GameSquare';
import GameTemplate from 'components/templates/GameTemplate';
import React from 'react';
import { connect } from 'react-redux';
import games from 'games';

function ClassicPage({ game, checkGameRoute }) {
   // const gameRows = [];
   // for (const row of game) {
   //    const rowSquares = [];
   //    for (const squareValue of row) {
   //       rowSquares.push(<GameSquare number={squareValue}></GameSquare>);
   //    }
   //    gameRows.push(<div className='game-row'>{rowSquares}</div>);
   // }
   return (
      <GameTemplate>
         {game === "loading" ? <div className='container9x9 game-container'></div> : null}
      </GameTemplate>
   );
}

const mapStateToProps = (state) => {
   const currentlyPlayedGame = state.games.currentlyPlayed;
   return {
      game: state.games[currentlyPlayedGame.gameType][
         currentlyPlayedGame.gameSubtype
      ],
   };
};

export default connect(mapStateToProps)(ClassicPage);
