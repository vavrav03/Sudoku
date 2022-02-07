import React from 'react';
import NormalPage from './NormalPage';
import GameControls from 'components/organisms/GameControls';

function GameTemplate({ children }) {
   return (
      <NormalPage>
         <div className='game-everything-container'>
            <div className='game-container'>{children}</div>
            <GameControls />
         </div>
      </NormalPage>
   );
}

export default GameTemplate;
