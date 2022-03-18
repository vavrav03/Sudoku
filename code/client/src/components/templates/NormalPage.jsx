import React, { useState } from 'react';
import Hidden from '@mui/material/Hidden';
import Navbar from 'components/organisms/Navbar/Navbar';
import Sidebar from 'components/organisms/Sidebar';

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
            className={`content-container ${
               isSidebarOpen ? 'sidebar-open' : ''
            }`}
         >
            {children}
         </div>
      </div>
   );
}

export default NormalPage;
export { NormalPage };
