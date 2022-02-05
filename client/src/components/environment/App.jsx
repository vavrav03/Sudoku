import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';
import Notifications from 'react-notification-system-redux';

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

function App({ history, store, notifications }) {
   return (
      <Provider store={store}>
         <Notifications notifications={notifications} />
         <ConnectedRouter history={history}>
            <div className='main'>
               <Switch>
                  <Route
                     path={routes.classicEasy}
                     exact
                     component={ClassicEasyPage}
                  ></Route>
                  <Route
                     path={routes.classicNormal}
                     exact
                     component={ClassicNormalPage}
                  ></Route>
                  <Route
                     path={routes.classicHard}
                     exact
                     component={ClassicHardPage}
                  ></Route>
                  <Route
                     path={routes.size2x2}
                     exact
                     component={Size2x2Page}
                  ></Route>
                  <Route
                     path={routes.size2x3}
                     exact
                     component={Size2x3Page}
                  ></Route>
                  <Route
                     path={routes.size4x4}
                     exact
                     component={Size4x4Page}
                  ></Route>
                  <Route
                     path={routes.diagonal}
                     exact
                     component={DiagonalPage}
                  ></Route>
                  <Route
                     path={routes.jigsaw}
                     exact
                     component={JigsawPage}
                  ></Route>
                  <Route
                     path={routes.samurai}
                     exact
                     component={SamuraiPage}
                  ></Route>
                  <Route
                     path={routes.samuraiMixed}
                     exact
                     component={SamuraiMixedPage}
                  ></Route>
                  <Route path={routes.home} exact component={HomePage}></Route>
                  <Route
                     path={routes.singIn}
                     exact
                     component={SignInPage}
                  ></Route>
                  <Route
                     path={routes.signUp}
                     exact
                     component={SignUpPage}
                  ></Route>
               </Switch>
            </div>
         </ConnectedRouter>
      </Provider>
   );
}

App.propTypes = {
   store: PropTypes.object.isRequired,
   history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
   return {
      notifications: getNotifications(state),
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
