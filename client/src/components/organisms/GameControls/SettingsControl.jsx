import React from 'react';
import { InputLabel, MenuItem, Select, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCurrentlyPlayedInstance, getCurrentlyPlayedType } from 'redux/reducers/games';
import { replaceGame } from 'redux/actions/games';
import _ from 'lodash';

function SettingsControl() {
   const dispatch = useDispatch();
   const cpgType = useSelector(getCurrentlyPlayedType);
   const cpgInstance = useSelector(getCurrentlyPlayedInstance);
   const handleResetOnClick = () => {
      cpgInstance.playingBoard = _.cloneDeep(cpgInstance.seed);
      dispatch(replaceGame(cpgType, cpgInstance));
   }
   const handleSolveOnClick = () => {
      cpgInstance.playingBoard = _.cloneDeep(cpgInstance.solution);
      dispatch(replaceGame(cpgType, cpgInstance));
   }
   const handleNewGameOnClick = () => {
      dispatch(replaceGame(cpgType, null));
   }
   return (
      <div className='settings-controllers-container'>
         <Button onClick={handleResetOnClick} variant={'outlined'} className="settings-button">Reset</Button>
         <Button onClick={handleSolveOnClick} variant={'outlined'} className="settings-button">Solve</Button>
         <Button onClick={handleNewGameOnClick} variant={'outlined'} className="settings-button">New game</Button>
      </div>
   );
}

export default SettingsControl;
