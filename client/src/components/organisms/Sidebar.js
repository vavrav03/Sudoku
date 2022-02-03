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

import classicEasyImage from 'assets/img/icons/classicEasy.png';
import classicNormalImage from 'assets/img/icons/classicNormal.png';
import classicHardImage from 'assets/img/icons/classicHard.png';
import size2x2Image from 'assets/img/icons/size2x2.png';
import size2x3Image from 'assets/img/icons/size2x3.png';
import size4x4Image from 'assets/img/icons/size4x4.png';
import diagonalImage from 'assets/img/icons/diagonal.png';
import jigsawImage from 'assets/img/icons/jigsaw.png';
import samuraiImage from 'assets/img/icons/samurai.png';
import samuraiMixed from 'assets/img/icons/samuraiMixed.png';

const SidebarItem = ({ id, name, image, height = 20, width = 20 }) => {
   return (
      <ListItem
         onClick={() => {
            /*TODO dispatch(name)*/
         }}
         button
         key={id}
      >
         <ListItemIcon className='sidebar-list-item'>
            <div class='icon-container'>
               <img height={height} width={width} src={image}></img>
            </div>
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
                  name='Jednoduché'jigsawImage
                  image={classicEasyImage}
               ></SidebarItem>
               <SidebarItem
                  id='classicMedium'
                  name='Střední'
                  image={classicNormalImage}
               ></SidebarItem>
               <SidebarItem
                  id='classicHard'
                  name='Těžké'
                  image={classicHardImage}
               ></SidebarItem>
            </List>
            <Divider />
            <List>
               <ListSubheader>UPRAVENÉ ROZMĚRY</ListSubheader>
               <SidebarItem
                  id='size2x2'
                  name='2x2'
                  image={size2x2Image}
                  height={13}
                  width={13}
               ></SidebarItem>
               <SidebarItem
                  id='size2x3'
                  name='2x3'
                  image={size2x3Image}
                  height={13}
                  width={20}
               ></SidebarItem>
               <SidebarItem
                  id='size4x4'
                  name='4x4'
                  image={size4x4Image}
                  height={26}
                  width={26}
               ></SidebarItem>
            </List>
            <Divider />
            <List>
               <ListSubheader>JINÉ MÓDY</ListSubheader>
               <SidebarItem
                  id='diagonal'
                  name='Diagonální'
                  image={diagonalImage}
               ></SidebarItem>
               <SidebarItem
                  id='jigsaw'
                  name='Jigsaw'
                  image={jigsawImage}
               ></SidebarItem>
               <SidebarItem
                  id='samurai'
                  name='Samurai'
                  image={samuraiImage}
               ></SidebarItem>
               <SidebarItem
                  id='samuraiMixed'
                  name='Samurai kombinace'
                  image={samuraiMixed}
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
