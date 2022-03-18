import React from 'react';
import NormalPage from '../templates/NormalPage';
import GameControls from 'components/organisms/GameControls/GameControls';
import SettingsControl from 'components/organisms/GameControls/SettingsControl';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import {
   ClassicGameBoard,
   ClassicXGameBoard,
   JigsawGameBoard,
} from 'components/organisms/GameBoards/GameBoards';
import games from 'games';
import { getCurrentlyPlayedInstance, getCurrentlyPlayedType } from 'redux/reducers/games';
import { Redirect } from 'react-router';
import routes from 'routes';
import GameChooserForm from 'components/organisms/GameControls/GameChooserForm';
import { useSelector } from 'react-redux';

function GamePage() {
   const game = useSelector(getCurrentlyPlayedInstance);
   const currentlyPlayedType = useSelector(getCurrentlyPlayedType)
   if (game === 'loading') {
      return (
         <NormalPage>
            <div className='spinner-container'>
               <ClipLoader loading={true} size={38} />
               Loading this type of game, please wait
            </div>
         </NormalPage>
      );
   }
   if (!game) {
      return (
         <NormalPage>
            <div className='game-everything-container'>
               <GameChooserForm/>
            </div>
         </NormalPage>
      );
   }

   let board;
   switch (currentlyPlayedType) {
      case games.classic.type:
         board = <ClassicGameBoard />;
         break;
      case games.classicX.type:
         board = <ClassicXGameBoard />;
         break;
      case games.jigsaw.type:
         board = <JigsawGameBoard />;
         break;
      case games.samurai.type:
         //TODO
         break;
      case games.samuraiMixed.type:
         //TODO
         break;
      default:
         board = null;
   }
   return (
      <NormalPage>
         <div className='game-everything-container'>
            {/* <GameControls
               rowCount={3}
               colCount={3}
               currentNumber={null}
               helpNumbers={[1, 5, 7]}
            /> */}
            <div className='game-container-layouter'>{board}</div>
            <SettingsControl />
         </div>
      </NormalPage>
   );
}

export default GamePage
