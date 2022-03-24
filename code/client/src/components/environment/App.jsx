import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';
import Notifications from 'react-notification-system-redux';
import ReactTooltip from 'react-tooltip';

import routes from 'routes';
import {
   GamePage,
   HomePage,
   SignInPage,
   SignUpPage,
   UnfinishedGamesPage,
   ShopPage,
   UserProfilePage
} from 'components/pages';
import { getNotificationsSelector } from 'redux/selectors';
import { attemptUpdateUser } from 'redux/actions';

function App({ history, store }) {
   const notifications = useSelector(getNotificationsSelector);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(attemptUpdateUser());
   }, []);
   return (
      <Provider store={store}>
         <ReactTooltip />
         <Notifications notifications={notifications} />
         <ConnectedRouter history={history}>
            <div className='main'>
               <Switch>
                  <Route
                     path={routes.games}
                     exact
                     component={GamePage}
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

export default App;
export { App };
