import React from 'react';

import { Checkbox, FormControlLabel, Grid, Divider, Typography } from '@mui/material';
import { SignButton } from 'components/atoms/Button';
import { LockIcon } from "components/atoms/Icons";
import { PasswordFormInput, SignFormInput } from 'components/atoms/Input';
import { ConnectedSignInFormFooter } from 'components/molecules/SignForm/SignFormFooter';
import { ConnectedSocialMedia } from 'components/molecules/SignForm/SignFormSocialMedia';

import { Formik, Form, FastField } from 'formik';
import { attemptLogin } from 'redux/actions/auth';
import { connect } from 'react-redux';

function SignInPage({ onSubmit }) {
   return (
      <div className={'center-in-viewport'}>
         <div className={'sign-form-container sign-in'}>
            <Formik
               initialValues={{
                  email: '',
                  password: '',
                  rememberMe: false,
               }}
               onSubmit={onSubmit}
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
                        <ConnectedSocialMedia />
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
                        <SignButton text={"Sign in"} />
                     </Grid>
                  </Grid>
               </Form>
            </Formik>
            <ConnectedSignInFormFooter />
         </div>
      </div>
   );
}

const mapStateToProps = () => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {
      onSubmit: (formData, { setSubmitting }) => {
         dispatch(attemptLogin(formData));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
