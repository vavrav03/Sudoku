import React, { useState } from 'react';
import { InputLabel, MenuItem, Select, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { getCurrentlyPlayedTypeSelector } from 'redux/selectors';
import { loadNewGame, push } from 'redux/actions';
import games from 'games';
import routes from 'routes';

function GameChooserForm() {
   const [size, setSize] = useState('');
   const [difficulty, setDifficulty] = useState('');
   const dispatch = useDispatch();
   const currentlyPlayedType = useSelector(getCurrentlyPlayedTypeSelector);
   if (!currentlyPlayedType) {
      return <Redirect to={routes.home} />;
   }
   const sizes = games[currentlyPlayedType].sizes;
   const handleCreate = () => {
      dispatch(
         loadNewGame(
            games[currentlyPlayedType].makeMethod,
            games[currentlyPlayedType].apiCall,
            currentlyPlayedType,
            size,
            difficulty
         )
      );
   };

   return (
      <div className={'game-creator-container'}>
         <h1>Create {games[currentlyPlayedType].name} game</h1>

         <InputLabel id='game-size-label'>Game size</InputLabel>
         <Select
            labelId='game-size-label'
            value={size}
            className={'form-item'}
            label='Game size'
            onChange={(e) => setSize(e.target.value)}
         >
            {sizes.map((value) => {
               return <MenuItem value={value}>{`${value}x${value}`}</MenuItem>;
            })}
         </Select>
         <InputLabel id='game-difficulty-label'>Game difficulty</InputLabel>
         <Select
            labelId='game-difficulty-label'
            value={difficulty}
            className={'form-item'}
            label='Game size'
            onChange={(e) => setDifficulty(e.target.value)}
         >
            <MenuItem value={'easy'}>Easy</MenuItem>
            <MenuItem value={'normal'}>Normal</MenuItem>
            <MenuItem value={'hard'}>Hard</MenuItem>
         </Select>

         <Button
            fullWidth
            onClick={handleCreate}
            variant={'contained'}
            className={'form-item'}
            // color={'primary'}
         >
            Create game
         </Button>
      </div>
   );
}

export default GameChooserForm;
export {GameChooserForm}