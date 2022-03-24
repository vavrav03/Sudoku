import React from 'react';
import { Formik, Form, FastField } from 'formik';
import { useDispatch } from 'react-redux';

import {
   Checkbox,
   FormControlLabel,
   Grid,
   Divider,
   Typography,
   Button
} from '@mui/material';
import { LockIcon, PasswordFormInput, SignFormInput } from 'components/atoms';
import { SignInFormFooter, SocialMedia } from 'components/molecules';
import { attemptLogin } from 'redux/actions';

function SignInPage({ onSubmit }) {
   const dispatch = useDispatch();
   return (
      <div className={'center-in-viewport'}>
         <div className={'sign-form-container sign-in'}>
            <Formik
               initialValues={{
                  email: '',
                  password: '',
                  rememberMe: false,
               }}
               onSubmit={e => dispatch(attemptLogin(e))}
            >
               <Form>
                  <Grid container spacing={3}>
                     <Grid item xs={12}>
                        <div className={'sign-form-headding'}>
                           <LockIcon />
                           <Typography variant='h5'>Welcome back!</Typography>
                        </div>
                     </Grid>
                     <Grid item xs={12}>
                        <SocialMedia />
                     </Grid>
                     <Grid item xs={12}>
                        <Divider>or</Divider>
                     </Grid>
                     <Grid item xs={12}>
                        <FastField name='email'>
                           {({ field, form, meta }) => (
                              <SignFormInput
                                 label='Email Address'
                                 name='email'
                                 type='email'
                                 autoComplete='email'
                                 autoFocus
                                 inputProps={{ ...field }}
                              />
                           )}
                        </FastField>
                     </Grid>
                     <Grid item xs={12}>
                        <FastField name='password'>
                           {({ field, form, meta }) => (
                              <PasswordFormInput
                                 label='Password'
                                 name='password'
                                 inputProps={{ ...field }}
                              />
                           )}
                        </FastField>
                     </Grid>
                     <Grid item xs={12} className={'remember-me-container'}>
                        <FastField name='rememberMe'>
                           {({ field, form, meta }) => (
                              <FormControlLabel
                                 control={
                                    <Checkbox
                                       value='rememberMe'
                                       color='primary'
                                       inputProps={{ ...field }}
                                       checked={field.value}
                                    />
                                 }
                                 label='Remember me'
                              />
                           )}
                        </FastField>
                     </Grid>
                     <Grid item xs={12}>
                        <Button
                           fullWidth
                           variant={'contained'}
                           color={'primary'}
                           type='submit'
                        >
                           Sign in
                        </Button>
                     </Grid>
                  </Grid>
               </Form>
            </Formik>
            <SignInFormFooter />
         </div>
      </div>
   );
}

export default SignInPage
export {SignInPage}
