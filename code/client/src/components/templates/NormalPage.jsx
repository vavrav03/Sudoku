import React, { useState } from 'react';
import Hidden from '@mui/material/Hidden';

import {Navbar, Sidebar} from 'components/organisms';

function NormalPage(props) {
   const { children } = props;
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

   const openSidebar = () => {
      setIsSidebarOpen(true);
   };

   const closeSidebar = () => {
      setIsSidebarOpen(false);
   };

   return (
      <div className='normal-page-container'>
         <nav className='sidebar-container'>
            <Sidebar open={isSidebarOpen} closeSidebar={closeSidebar} />
            <Hidden smUp implementation='css'></Hidden>
            <Hidden xsDown implementation='css'></Hidden>
         </nav>
         <Navbar isSidebarOpen={isSidebarOpen} menuButtonAction={openSidebar} />
         <div
            className={`content-positioner ${
               isSidebarOpen ? 'sidebar-open' : ''
            }`}
         >
            <div className="content-container">
            {children}
            </div>
         </div>
      </div>
   );
}

export default NormalPage;
export { NormalPage };
