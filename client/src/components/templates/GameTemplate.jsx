import React from 'react';
import NormalPage from './NormalPage';
import GameControls from 'components/organisms/Game/GameControls';
import SettingsControl from 'components/organisms/Game/SettingsControl';

function GameTemplate({ children }) {
   return (
      <NormalPage>
         <div className='game-everything-container'>
            <GameControls rowCount={3} colCount={3} currentNumber={null} helpNumbers={[1, 5, 7]}/>
            {children}
            <SettingsControl />
         </div>
      </NormalPage>
   );
}

export default GameTemplate;
