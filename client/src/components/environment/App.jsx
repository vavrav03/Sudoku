import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';
import Notifications from 'react-notification-system-redux';
import ReactTooltip from 'react-tooltip';

import { getNotifications } from 'redux/selectors';
import { attemptUpdateUser } from 'redux/actions';

import routes from 'routes';

import {
   ClassicPage,
   ClassicXPage,
   JigsawPage,
   SamuraiPage,
   SamuraiMixedPage,
   HomePage,
   SignInPage,
   SignUpPage,
   UnfinishedGamesPage,
   ShopPage,
} from 'components/pages/index';
import UserProfilePage from 'components/pages/UserProfilePage';
import ClassicResizedPage from 'components/pages/games/ClassicResizedPage';

function App({ history, attemptUpdateUser, store, notifications }) {
   useEffect(() => {
      attemptUpdateUser();
   }, []);
   return (
      <Provider store={store}>
         <ReactTooltip />
         <Notifications notifications={notifications} />
         <ConnectedRouter history={history}>
            <div className='main'>
               <Switch>
                  <Route
                     path={routes.classic}
                     exact
                     component={ClassicPage}
                  ></Route>
                  <Route
                     path={routes.classicResized}
                     exact
                     component={ClassicResizedPage}
                  ></Route>
                  <Route
                     path={routes.classicX}
                     exact
                     component={ClassicXPage}
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
                  <Route
                     path={routes.shop}
                     exact
                     component={ShopPage}
                  ></Route>
                  <Route
                     path={routes.unfinishedGames}
                     exact
                     component={UnfinishedGamesPage}
                  ></Route>
                  <Route
                     path={routes.userProfile}
                     exact
                     component={UserProfilePage}
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
