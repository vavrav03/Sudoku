import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import { connect } from 'react-redux';
import { notImplementedYet } from 'redux/actions/error';
import { attemptLogout } from 'redux/actions/auth';

import { Link } from 'react-router-dom';
import { ClassicEasySudokuIcon, ClassicHardSudokuIcon, ClassicNormalSudokuIcon, DiagonalSudokuIcon, JigsawSudokuIcon, SamuraiMixedSudokuIcon, SamuraiSudokuIcon, Size2x2SudokuIcon, Size2x3SudokuIcon, Size4x4SudokuIcon } from 'components/atoms/Icons';

const standardIconSize = 23;

const SidebarItem = ({ id, name, imageIcon }) => {
   return (
      <ListItem
         component={Link}
         to={`/game/${id}`}
         onClick={() => {
            /*TODO dispatch(name)*/
         }}
         button
         key={id}
      >
         <ListItemIcon className='sidebar-list-item'>
            <div class='icon-container'>{imageIcon}</div>
         </ListItemIcon>
         <ListItemText primary={name} />
      </ListItem>
   );
};

function Sidebar({ open, closeSidebar, showNotImplementedYet, attemptLogout }) {
   return (
      <Drawer variant='persistent' anchor='left' open={open}>
         <div className={'sidebar'}>
            <header className='sidebar-header'>
               <Typography variant='h6'>SUDOKU</Typography>
               <IconButton onClick={closeSidebar}>
                  <ChevronLeftIcon />
               </IconButton>
            </header>
            <Divider />
            <List>
               <ListSubheader>KLASIKA</ListSubheader>
               <SidebarItem
                  id='classicEasy'
                  name='Jednoduché'
                  jigsawImage
                  imageIcon={<ClassicEasySudokuIcon width={standardIconSize} height={standardIconSize} />}
               ></SidebarItem>
               <SidebarItem
                  id='classicNormal'
                  name='Střední'
                  imageIcon={<ClassicNormalSudokuIcon width={standardIconSize} height={standardIconSize} />}
               ></SidebarItem>
               <SidebarItem
                  id='classicHard'
                  name='Těžké'
                  imageIcon={<ClassicHardSudokuIcon width={standardIconSize} height={standardIconSize} />}
               ></SidebarItem>
            </List>
            <Divider />
            <List>
               <ListSubheader>UPRAVENÉ ROZMĚRY</ListSubheader>
               <SidebarItem
                  id='size2x2'
                  name='2x2'
                  imageIcon={<Size2x2SudokuIcon width={standardIconSize*2/3} height={standardIconSize*2/3} />}
               ></SidebarItem>
               <SidebarItem
                  id='size2x3'
                  name='2x3'
                  imageIcon={<Size2x3SudokuIcon width={standardIconSize} height={standardIconSize*2/3} />}
               ></SidebarItem>
               <SidebarItem
                  id='size4x4'
                  name='4x4'
                  imageIcon={<Size4x4SudokuIcon width={standardIconSize*1.3} height={standardIconSize*1.3} />}
               ></SidebarItem>
            </List>
            <Divider />
            <List>
               <ListSubheader>JINÉ MÓDY</ListSubheader>
               <SidebarItem
                  id='diagonal'
                  name='Diagonální'
                  imageIcon={<DiagonalSudokuIcon width={standardIconSize} height={standardIconSize} />}
               ></SidebarItem>
               <SidebarItem
                  id='jigsaw'
                  name='Jigsaw'
                  imageIcon={<JigsawSudokuIcon width={standardIconSize} height={standardIconSize} />}
               ></SidebarItem>
               <SidebarItem
                  id='samurai'
                  name='Samurai'
                  imageIcon={<SamuraiSudokuIcon width={standardIconSize} height={standardIconSize} />}
               ></SidebarItem>
               <SidebarItem
                  id='samuraiMixed'
                  name='Samurai kombinace'
                  imageIcon={<SamuraiMixedSudokuIcon width={standardIconSize} height={standardIconSize} />}
               ></SidebarItem>
            </List>
         </div>
      </Drawer>
   );
}

const mapDispatchToProps = (dispatch) => {
   return {
      showNotImplementedYet: () => dispatch(notImplementedYet()),
      attemptLogout: () => dispatch(attemptLogout()),
   };
};

const ConnectedSidebar = connect(null, mapDispatchToProps)(Sidebar);

export default ConnectedSidebar;
export { Sidebar, ConnectedSidebar };
