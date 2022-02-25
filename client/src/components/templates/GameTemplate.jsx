import React from 'react';
import NormalPage from './NormalPage';
import GameControls from 'components/organisms/Game/GameControls';
import SettingsControl from 'components/organisms/Game/SettingsControl';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import {checkGameRoute} from 'redux/actions'

function GameTemplate({ checkGameRoute, children }) {
   useEffect(() => {
      console.log('fff');
      checkGameRoute()
   })
   return (
      <NormalPage>
         <div className='game-everything-container'>
            <GameControls
               rowCount={3}
               colCount={3}
               currentNumber={null}
               helpNumbers={[1, 5, 7]}
            />
            {children}
            <SettingsControl />
         </div>
      </NormalPage>
   );
}

const mapDispatchToProps = (dispatch) => {
   return {
      checkGameRoute: () =>
         dispatch(checkGameRoute()),
   };
};

export default connect(null, mapDispatchToProps)(GameTemplate);
