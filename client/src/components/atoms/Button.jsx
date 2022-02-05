import React from 'react';
import { Button } from '@mui/material';

function SignButton({ text }) {
   return (
      <Button
         fullWidth
         variant={'contained'}
         color={'primary'}
         className={'sign-button'}
         type='submit'
      >
         {text}
      </Button>
   );
}

export { SignButton };
