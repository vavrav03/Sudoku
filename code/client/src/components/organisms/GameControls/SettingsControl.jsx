import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Button } from '@mui/material';

import { getCurrentlyPlayedInstanceSelector, getCurrentlyPlayedTypeSelector } from 'redux/selectors';
import { replaceGame, saveUnfinishedGame, removeUnfinishedGame  } from 'redux/actions';

function SettingsControl() {
   const dispatch = useDispatch();
   const cpgType = useSelector(getCurrentlyPlayedTypeSelector);
   const cpgInstance = useSelector(getCurrentlyPlayedInstanceSelector);
   const handleResetOnClick = () => {
      cpgInstance.playingBoard = _.cloneDeep(cpgInstance.seed);
      dispatch(replaceGame(cpgType, cpgInstance));
   }
   const handleSolveOnClick = () => {
      cpgInstance.playingBoard = _.cloneDeep(cpgInstance.solution);
      cpgInstance.usedSolve = true;
      dispatch(replaceGame(cpgType, cpgInstance));
   }
   const handleNewGameOnClick = () => {
      dispatch(replaceGame(cpgType, null));
   }
   const handleSave = () => {
      if(cpgInstance.created_at) {
         dispatch(saveUnfinishedGame(cpgInstance.created_at, cpgInstance))
      }
   }
   const handleRemoveFromUnfinished = () => {
      if(cpgInstance.created_at) {
         dispatch(removeUnfinishedGame(cpgInstance.created_at))
      }
   }

   return (
      <div className='settings-controllers-container'>
         <Button onClick={handleResetOnClick} variant={'outlined'} className="settings-button">Reset</Button>
         <Button onClick={handleSolveOnClick} variant={'outlined'} className="settings-button">Solve</Button>
         <Button onClick={handleNewGameOnClick} variant={'outlined'} className="settings-button">New game</Button>
         <Button onClick={handleSave} variant={'outlined'} className="settings-button">Save</Button>
         <Button onClick={handleRemoveFromUnfinished} variant={'outlined'} className="settings-button">Delete in DB</Button>
      </div>
   );
}

export default SettingsControl;
export {SettingsControl}