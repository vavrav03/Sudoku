import {
   Divider,
   List,
   ListItem,
   ListItemText,
   Drawer,
   IconButton,
   Typography,
   ListSubheader,
   Collapse,
} from '@mui/material';
import {
   ClassicEasySudokuIcon,
   ClassicHardSudokuIcon,
   ClassicNormalSudokuIcon,
   ClassicXSudokuIcon,
   JigsawSudokuIcon,
   SamuraiMixedSudokuIcon,
   SamuraiSudokuIcon,
   Size2x2SudokuIcon,
   Size2x3SudokuIcon,
   Size4x4SudokuIcon,
} from 'components/atoms/Icons';
import {
   ChevronLeft,
   ExpandLess as ExpandLessIcon,
   ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { connect } from 'react-redux';
import { notImplementedYet, attemptLogout, startGame } from 'redux/actions';
import { useEffect, useState } from 'react';

import games from 'games';

const standardIconSize = 23;

const SidebarItem = ({ reduxAction, name, ImageIconComponent }) => {
   return (
      <ListItem
         className={`list-item`}
         button
         onClick={(e) => {
            reduxAction();
         }}
      >
         <div className='game-icon-container'>
            {
               <ImageIconComponent
                  width={standardIconSize}
                  height={standardIconSize}
               />
            }
         </div>
         <ListItemText primary={name} />
      </ListItem>
   );
};

//sizeData format: [{name, reduxAction}]
const SidebarCollapsibleItem = ({ sizesData, name, ImageIconComponent }) => {
   const [open, setOpen] = useState(false);
   return (
      <>
         <ListItem
            className={`list-item`}
            button
            onClick={(e) => setOpen(!open)}
         >
            <div className='game-icon-container'>
               <ImageIconComponent
                  width={standardIconSize}
                  height={standardIconSize}
               />
            </div>
            <ListItemText primary={name} />
            <div className='chevron-icon-container'>
               {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
         </ListItem>
         <Collapse className='collapse-block' in={open}>
            {sizesData.map((value) => {
               return (
                  <div
                     className={'collaped-item'}
                     key={value.name}
                     onClick={(e) => value.reduxAction()}
                  >
                     {value.name}
                  </div>
               );
            })}
         </Collapse>
      </>
   );
};

const SidebarCollapsibleGameItem = ({
   game,
   ImageIconComponent,
   startGame,
}) => {
   return (
      <SidebarCollapsibleItem
         name={game.name}
         ImageIconComponent={ImageIconComponent}
         sizesData={game.subTypes.map((value) => {
            return {
               name: `${value}x${value}`,
               reduxAction: (e) => {
                  startGame(
                     game.makeMethod,
                     game.apiCall,
                     game.gameType,
                     value
                  );
               },
            };
         })}
      ></SidebarCollapsibleItem>
   );
};

function Sidebar({ startGame, open, closeSidebar }) {
   return (
      <Drawer variant='persistent' anchor='left' open={open}>
         <div className={'sidebar'}>
            <header className='sidebar-header'>
               <Typography variant='h6'>SUDOKU</Typography>
               <IconButton onClick={closeSidebar}>
                  <ChevronLeft />
               </IconButton>
               {}
            </header>
            <Divider />
            <List>
               <ListSubheader>CLASSIC</ListSubheader>
               <SidebarItem
                  name={'Easy'}
                  ImageIconComponent={ClassicEasySudokuIcon}
                  reduxAction={(e) =>
                     startGame(
                        games.classic.makeMethod,
                        games.classic.apiCall,
                        'classic',
                        'easy'
                     )
                  }
               />
               <SidebarItem
                  name={'Normal'}
                  ImageIconComponent={ClassicNormalSudokuIcon}
                  reduxAction={(e) =>
                     startGame(
                        games.classic.makeMethod,
                        games.classic.apiCall,
                        'classic',
                        'normal'
                     )
                  }
               />
               <SidebarItem
                  name={'Hard'}
                  ImageIconComponent={ClassicHardSudokuIcon}
                  reduxAction={(e) =>
                     startGame(
                        games.classic.makeMethod,
                        games.classic.apiCall,
                        'classic',
                        'hard'
                     )
                  }
               />
            </List>
            <Divider />
            <List>
               <ListSubheader>OTHER MODES</ListSubheader>
               <SidebarCollapsibleGameItem
                  game={games.classicResized}
                  ImageIconComponent={Size4x4SudokuIcon}
                  startGame={startGame}
               />
               <SidebarCollapsibleGameItem
                  game={games.classicX}
                  ImageIconComponent={ClassicXSudokuIcon}
                  startGame={startGame}
               />
               <SidebarCollapsibleGameItem
                  game={games.jigsaw}
                  ImageIconComponent={JigsawSudokuIcon}
                  startGame={startGame}
               />
               <SidebarCollapsibleGameItem
                  game={games.samurai}
                  ImageIconComponent={SamuraiSudokuIcon}
                  startGame={startGame}
               />
               <SidebarCollapsibleGameItem
                  game={games.samuraiMixed}
                  ImageIconComponent={SamuraiMixedSudokuIcon}
                  startGame={startGame}
               />
            </List>
         </div>
      </Drawer>
   );
}

const mapDispatchToProps = (dispatch) => {
   return {
      showNotImplementedYet: () => {
         dispatch(notImplementedYet());
      },
      startGame: (makeMethod, apiCall, gameType, gameSubtype) => {
         dispatch(startGame(makeMethod, apiCall, gameType, gameSubtype));
      },
   };
};

const ConnectedSidebar = connect(null, mapDispatchToProps)(Sidebar);

export default ConnectedSidebar;
export { ConnectedSidebar };
