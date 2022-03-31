import React, { useState } from 'react';
import { InputLabel, MenuItem, Select, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import {
   getCurrentlyPlayedTypeSelector,
   getShopItemsSelector,
   getUserBoughtItemsSelector,
   getUserSelector
} from 'redux/selectors';
import { loadNewGame, push, justUpdateUserFromBackend } from 'redux/actions';
import games from 'games';
import routes from 'routes';

function GameChooserForm() {
   const [size, setSize] = useState('');
   const [difficulty, setDifficulty] = useState('');
   const dispatch = useDispatch();
   const shopItems = useSelector(getShopItemsSelector);
   const user = useSelector(getUserSelector);
   const boughtItems = useSelector(getUserBoughtItemsSelector);

   const currentlyPlayedType = useSelector(getCurrentlyPlayedTypeSelector);
   if (!currentlyPlayedType) {
      return <Redirect to={routes.home} />;
   }
   const sizes = games[currentlyPlayedType].sizes;
   let canStart = true;
   let isPremium = false;
   const handleCreate = () => {
      if(!canStart){
         return;
      }
      dispatch(
         loadNewGame(
            games[currentlyPlayedType].makeMethod,
            games[currentlyPlayedType].apiCall,
            currentlyPlayedType,
            size,
            difficulty,
            isPremium
         )
      );
   };

   const createPremiumText = () => {
      canStart = true;
      isPremium = false;
      if(!size || !difficulty) {
         return '';
      }
      const shopItem = shopItems.find((item) => {
         const lowerCaseItemName = item.name.toLowerCase();
         return (
            lowerCaseItemName.includes(currentlyPlayedType) &&
            lowerCaseItemName.includes(`${size}x${size}`) &&
            lowerCaseItemName.includes(difficulty)
         );
      });
      if(!shopItem) {
         return '';
      }
      isPremium = true;
      if(!user?.email){
         canStart = false;
         return 'This game type is premium. Log in and buy it to play.';
      }
      const validBoughtItem = boughtItems.find((item) => item.name === shopItem.name);
      if(validBoughtItem){
         return `Premium - you have ${validBoughtItem.count}`;
      } else {
         canStart = false;
         return `Premium - you have 0, please buy some in the shop to play.`;
      }
   };
   const premiumText = createPremiumText();

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
               return (
                  <MenuItem
                     key={value}
                     value={value}
                  >{`${value}x${value}`}</MenuItem>
               );
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
         {premiumText}
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
export { GameChooserForm };
