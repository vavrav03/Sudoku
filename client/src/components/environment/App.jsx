import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';
import Notifications from 'react-notification-system-redux';

import { createMuiTheme, ThemeProvider } from '@mui/material';
import { getNotifications } from 'redux/selectors';
import { attemptUpdateUser } from 'redux/actions/user';

import routes from 'routes';

import {
   ClassicEasyPage,
   ClassicNormalPage,
   ClassicHardPage,
   Size2x2Page,
   Size2x3Page,
   Size4x4Page,
   DiagonalPage,
   JigsawPage,
   SamuraiPage,
   SamuraiMixedPage,
   HomePage,
   SignInPage,
   SignUpPage,
} from 'components/pages/index';

const theme = createMuiTheme({
   // typography: {
   //    fontFamily: ['Roboto', 'Arial'],
   // },
   // palette: {
   //    primary: blue,
   // },
});

function App({
   history,
   store,
   notifications,
   isLoading,
   email,
   attemptUpdateUser,
}) {
   useEffect(() => {
      attemptUpdateUser();
   }, [attemptUpdateUser]);
   return isLoading && !email ? (
      <div>Loading</div>
   ) : (
      <ThemeProvider theme={theme}>
         <Provider store={store}>
            <Notifications notifications={notifications} />
            <ConnectedRouter history={history}>
               <div className='main'>
                  <Switch>
                     <Route
                        path={routes.classicEasy}
                        component={ClassicEasyPage}
                     ></Route>
                     <Route
                        path={routes.classicNormal}
                        component={ClassicNormalPage}
                     ></Route>
                     <Route
                        path={routes.classicHard}
                        component={ClassicHardPage}
                     ></Route>
                     <Route
                        path={routes.size2x2}
                        component={Size2x2Page}
                     ></Route>
                     <Route
                        path={routes.size2x3}
                        component={Size2x3Page}
                     ></Route>
                     <Route
                        path={routes.size4x4}
                        component={Size4x4Page}
                     ></Route>
                     <Route
                        path={routes.diagonal}
                        component={DiagonalPage}
                     ></Route>
                     <Route
                        path={routes.jigsaw}
                        component={JigsawPage}
                     ></Route>
                     <Route
                        path={routes.samurai}
                        component={SamuraiPage}
                     ></Route>
                     <Route
                        path={routes.samuraiMixed}
                        component={SamuraiMixedPage}
                     ></Route>
                     <Route
                        path={routes.home}
                        component={HomePage}
                     ></Route>
                     <Route
                        path={routes.singIn}
                        component={SignInPage}
                     ></Route>
                     <Route
                        path={routes.signUp}
                        component={SignUpPage}
                     ></Route>
                  </Switch>
               </div>
            </ConnectedRouter>
         </Provider>
      </ThemeProvider>
   );
}

App.propTypes = {
   store: PropTypes.object.isRequired,
   history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
   return {
      notifications: getNotifications(state),
      isLoading: state.user.isLoading,
      email: state.user.email,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      attemptUpdateUser: () => dispatch(attemptUpdateUser()),
   };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
export { App, ConnectedApp };
