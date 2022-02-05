import {
   Divider,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Drawer,
   IconButton,
   Typography,
   ListSubheader,
} from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { connect } from 'react-redux';
import { notImplementedYet } from 'redux/actions/error';
import { attemptLogout } from 'redux/actions/auth';

import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import games from 'games';

const standardIconSize = 23;

const SidebarItem = ({ path, name, imageIcon }) => {
   const location = useLocation();
   return (
      <ListItem
         className={`list-item ${location.pathname == path ? 'active' : ''}`}
         component={Link}
         to={path}
         button
         key={path}
      >
         <ListItemIcon>
            <div className='icon-container'>{imageIcon}</div>
         </ListItemIcon>
         <ListItemText primary={name} />
      </ListItem>
   );
};

function Sidebar({ open, closeSidebar }) {
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
               <ListSubheader>CLASSIC</ListSubheader>
               <SidebarItem
                  path={games.classic.classicEasy.route}
                  name={games.classic.classicEasy.name}
                  imageIcon={
                     <games.classic.classicEasy.ImageIcon
                        width={standardIconSize}
                        height={standardIconSize}
                     />
                  }
               ></SidebarItem>
               <SidebarItem
                  path={games.classic.classicNormal.route}
                  name={games.classic.classicNormal.name}
                  imageIcon={
                     <games.classic.classicNormal.ImageIcon
                        width={standardIconSize}
                        height={standardIconSize}
                     />
                  }
               ></SidebarItem>
               <SidebarItem
                  path={games.classic.classicHard.route}
                  name={games.classic.classicHard.name}
                  imageIcon={
                     <games.classic.classicHard.ImageIcon
                        width={standardIconSize}
                        height={standardIconSize}
                     />
                  }
               ></SidebarItem>
            </List>
            <Divider />
            <List>
               <ListSubheader>ADJUSTED SIZE</ListSubheader>
               <SidebarItem
                  path={games.size.size2x2.route}
                  name={games.size.size2x2.name}
                  imageIcon={
                     <games.size.size2x2.ImageIcon
                        width={(standardIconSize * 2) / 3}
                        height={(standardIconSize * 2) / 3}
                     />
                  }
               ></SidebarItem>
               <SidebarItem
                  path={games.size.size2x3.route}
                  name={games.size.size2x3.name}
                  imageIcon={
                     <games.size.size2x3.ImageIcon
                        width={standardIconSize}
                        height={(standardIconSize * 2) / 3}
                     />
                  }
               ></SidebarItem>
               <SidebarItem
                  path={games.size.size4x4.route}
                  name={games.size.size4x4.name}
                  imageIcon={
                     <games.size.size4x4.ImageIcon
                        width={standardIconSize * 1.3}
                        height={standardIconSize * 1.3}
                     />
                  }
               ></SidebarItem>
            </List>
            <Divider />
            <List>
               <ListSubheader>OTHER MODES</ListSubheader>
               <SidebarItem
                  path={games.other.diagonal.route}
                  name={games.other.diagonal.name}
                  imageIcon={
                     <games.other.diagonal.ImageIcon
                        width={standardIconSize}
                        height={standardIconSize}
                     />
                  }
               ></SidebarItem>
               <SidebarItem
                  path={games.other.jigsaw.route}
                  name={games.other.jigsaw.name}
                  imageIcon={
                     <games.other.jigsaw.ImageIcon
                        width={standardIconSize}
                        height={standardIconSize}
                     />
                  }
               ></SidebarItem>
               <SidebarItem
                  path={games.other.samurai.route}
                  name={games.other.samurai.name}
                  imageIcon={
                     <games.other.samurai.ImageIcon
                        width={standardIconSize}
                        height={standardIconSize}
                     />
                  }
               ></SidebarItem>
               <SidebarItem
                  path={games.other.samuraiMixed.route}
                  name={games.other.samuraiMixed.name}
                  imageIcon={
                     <games.other.samuraiMixed.ImageIcon
                        width={standardIconSize}
                        height={standardIconSize}
                     />
                  }
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
