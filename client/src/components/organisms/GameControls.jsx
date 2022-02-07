import React from 'react';
import { Divider } from '@mui/material';
import { useState } from 'react';

function GameControls() {

	const {open, setOpen} = useState(true);

   return (
      <div className={`game-controls-container ${open ? 'open' : 'collapsed'}`}>

      </div>
   );
}

export default GameControls;
