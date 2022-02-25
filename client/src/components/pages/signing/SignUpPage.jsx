import React from 'react';
import {} from '@mui/material';
import { Grid, Divider, Typography } from '@mui/material';
import { SignButton } from 'components/atoms/Button';
import { PasswordFormInput, SignFormInput } from 'components/atoms/Input';
import { SignUpFormFooter } from 'components/molecules/SignForm/SignFormFooter';
import { LockIcon } from 'components/atoms/Icons';
import { ConnectedSocialMedia } from 'components/molecules/SignForm/SignFormSocialMedia';

import { Formik, Form, FastField } from 'formik';
import * as Yup from 'yup';
import { attemptRegister } from 'redux/actions';
import { connect } from 'react-redux';

function SignUpPage({ onSubmit }) {
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
               onSubmit={onSubmit}
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
                        <ConnectedSocialMedia />
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
                        <SignButton text={'Sign up'} />
                     </Grid>
                  </Grid>
               </Form>
            </Formik>
            <SignUpFormFooter />
         </div>
      </div>
   );
}

const mapStateToProps = () => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {
      onSubmit: (data) => {
         dispatch(attemptRegister(data));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
