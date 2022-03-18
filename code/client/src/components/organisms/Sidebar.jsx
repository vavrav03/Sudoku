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
import { attemptLogout, startGame } from 'redux/actions';
import { useEffect, useState } from 'react';
import {chooseGameType} from 'redux/actions/games';


import games from 'games';
import { useDispatch } from 'react-redux';

const standardIconSize = 23;

// //sizeData format: [{name, reduxAction}]
// const SidebarCollapsibleItem = ({ sizesData, name, ImageIconComponent }) => {
//    const [open, setOpen] = useState(false);
//    return (
//       <>
//          <ListItem
//             className={`list-item`}
//             button
//             onClick={(e) => setOpen(!open)}
//          >
//             <div className='game-icon-container'>
//                <ImageIconComponent
//                   width={standardIconSize}
//                   height={standardIconSize}
//                />
//             </div>
//             <ListItemText primary={name} />
//             <div className='chevron-icon-container'>
//                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//             </div>
//          </ListItem>
//          <Collapse className='collapse-block' in={open}>
//             {sizesData.map((value) => {
//                return (
//                   <div
//                      className={'collaped-item'}
//                      key={value.name}
//                      onClick={(e) => value.reduxAction()}
//                   >
//                      {value.name}
//                   </div>
//                );
//             })}
//          </Collapse>
//       </>
//    );
// };

// const SidebarCollapsibleGameItem = ({
//    game,
//    ImageIconComponent,
// }) => {
//    const dispatch = useDispatch();
//    return (
//       <SidebarCollapsibleItem
//          name={game.name}
//          ImageIconComponent={ImageIconComponent}
//          sizesData={game.sizes.map((value) => {
//             return {
//                name: `${value}x${value}`,
//                reduxAction: (e) => {
//                   dispatch(startGame(
//                      game.makeMethod,
//                      game.apiCall,
//                      game.type,
//                      value
//                   ));
//                },
//             };
//          })}
//       ></SidebarCollapsibleItem>
//    );
// };

const SidebarItem = ({ onClick, text, ImageIconComponent }) => {
   return (
      <ListItem
         className={`list-item`}
         button
         onClick={onClick}
      >
         <div className='game-icon-container'>
            {
               <ImageIconComponent
                  width={standardIconSize}
                  height={standardIconSize}
               />
            }
         </div>
         <ListItemText primary={text} />
      </ListItem>
   );
};

function Sidebar({ open, closeSidebar }) {
   const dispatch = useDispatch();
   const onClickHandler = (type) => {
      dispatch(chooseGameType(type));
   }
   return (
      <Drawer variant='persistent' anchor='left' open={open}>
         <div className={'sidebar'}>
            <header className='sidebar-header'>
               <Typography variant='h6'>SUDOKU</Typography>
               <IconButton onClick={closeSidebar}>
                  <ChevronLeft />
               </IconButton>
            </header>
            <Divider />
            <List>
               <ListSubheader>SUDOKU TYPES</ListSubheader>
               <SidebarItem
                  text={games.classic.name}
                  onClick={onClickHandler.bind(this, games.classic.type)}
                  ImageIconComponent={ClassicNormalSudokuIcon}
               />
               <SidebarItem
                  text={games.classicX.name}
                  onClick={onClickHandler.bind(this, games.classicX.type)}
                  ImageIconComponent={ClassicXSudokuIcon}
               />
               <SidebarItem
                  text={games.jigsaw.name}
                  onClick={onClickHandler.bind(this, games.jigsaw.type)}
                  ImageIconComponent={JigsawSudokuIcon}
               />
               <SidebarItem
                  text={games.samurai.name}
                  onClick={onClickHandler.bind(this, games.samurai.type)}
                  ImageIconComponent={SamuraiSudokuIcon}
               />
               <SidebarItem
                  text={games.samuraiMixed.name}
                  onClick={onClickHandler.bind(this, games.samuraiMixed.type)}
                  ImageIconComponent={SamuraiMixedSudokuIcon}
               />
            </List>
         </div>
      </Drawer>
   );
}

export default Sidebar;
export { Sidebar };
