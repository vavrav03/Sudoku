import React from 'react';
import {} from '@mui/material';
import { Grid, Divider, Typography, Button } from '@mui/material';
import { PasswordFormInput, SignFormInput, LockIcon } from 'components/atoms';
import { SignUpFormFooter, SocialMedia } from 'components/molecules/';

import { Formik, Form, FastField } from 'formik';
import * as Yup from 'yup';
import { attemptRegister } from 'redux/actions';
import { useDispatch } from 'react-redux';

function SignUpPage({ }) {
   const dispatch = useDispatch();
   return (
      <div className={'center-in-viewport'}>
         <div className={'sign-form-container sign-up'}>
            <Formik
               initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
               }}
               validationSchema={Yup.object({
                  firstName: Yup.string().required('Required'),
                  lastName: Yup.string().required('Required'),
                  email: Yup.string()
                     .email('Invalid email address')
                     .required('Required'),
                  password: Yup.string()
                     .required('Required')
                     .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
                     ),
               })}
               onSubmit={e => dispatch(attemptRegister(e))}
            >
               <Form>
                  <Grid container spacing={3}>
                     <Grid item xs={12}>
                        <div className={'sign-form-headding'}>
                           <LockIcon />
                           <Typography variant='h5'>
                              Create an account
                           </Typography>
                        </div>
                     </Grid>
                     <Grid item xs={12}>
                        <SocialMedia />
                     </Grid>
                     <Grid item xs={12}>
                        <Divider>or</Divider>
                     </Grid>
                     <Grid item container spacing={3}>
                        <Grid item xs={6}>
                           <FastField name='firstName'>
                              {({ field, form, meta }) => (
                                 <SignFormInput
                                    label='First name'
                                    name='firstName'
                                    autoFocus
                                    inputProps={{ ...field }}
                                    error={
                                       meta.touched &&
                                       typeof meta.error !== 'undefined'
                                    }
                                    helperText={
                                       meta.touched &&
                                       typeof meta.error !== 'undefined'
                                          ? meta.error
                                          : ''
                                    }
                                 />
                              )}
                           </FastField>
                        </Grid>
                        <Grid item xs={6}>
                           <FastField name='lastName'>
                              {({ field, form, meta }) => (
                                 <SignFormInput
                                    label='Last name'
                                    name='firstName'
                                    inputProps={{ ...field }}
                                    error={
                                       meta.touched &&
                                       typeof meta.error !== 'undefined'
                                    }
                                    helperText={
                                       meta.touched &&
                                       typeof meta.error !== 'undefined'
                                          ? meta.error
                                          : ''
                                    }
                                 />
                              )}
                           </FastField>
                        </Grid>
                     </Grid>
                     <Grid item xs={12}>
                        <FastField name='email'>
                           {({ field, form, meta }) => (
                              <SignFormInput
                                 label='Email Address'
                                 name='email'
                                 type='email'
                                 autoComplete='email'
                                 inputProps={{ ...field }}
                                 error={
                                    meta.touched &&
                                    typeof meta.error !== 'undefined'
                                 }
                                 helperText={
                                    meta.touched &&
                                    typeof meta.error !== 'undefined'
                                       ? meta.error
                                       : ''
                                 }
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
                                 error={
                                    meta.touched &&
                                    typeof meta.error !== 'undefined'
                                 }
                                 helperText={
                                    meta.touched &&
                                    typeof meta.error !== 'undefined'
                                       ? meta.error
                                       : ''
                                 }
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
                           Sign Up
                        </Button>
                     </Grid>
                  </Grid>
               </Form>
            </Formik>
            <SignUpFormFooter />
         </div>
      </div>
   );
}

export default SignUpPage;
export {SignUpPage}
