import React from 'react';
import { useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import games from 'games';
import { NormalPage } from 'components/templates';
import {
   SettingsControl,
   ClassicGameBoard,
   ClassicXGameBoard,
   JigsawGameBoard,
   GameChooserForm
} from 'components/organisms';
import {
   getCurrentlyPlayedInstanceSelector,
   getCurrentlyPlayedTypeSelector,
} from 'redux/selectors';

function GamePage() {
   const game = useSelector(getCurrentlyPlayedInstanceSelector);
   const currentlyPlayedType = useSelector(getCurrentlyPlayedTypeSelector);
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
               <GameChooserForm />
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

export default GamePage;
export {GamePage}