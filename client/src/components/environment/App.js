import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect, Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router";
import Notifications from "react-notification-system-redux";
import HomePage from "components/pages/HomePage";
import SignInPage from "components/pages/SignInPage";
import SignUpPage from "components/pages/SignUpPage";
import ClassicEasy from "components/pages/games/ClassicEasy";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import { getNotifications } from "redux/selectors";
import { attemptUpdateUser } from "redux/actions/user";

const theme = createMuiTheme({
   typography: {
      fontFamily: ["Roboto", "Arial"],
   },
   palette: {
      primary: blue,
   },
});

function App({ history, store, notifications, isLoading, email, attemptUpdateUser }) {
   useEffect(() => {
      attemptUpdateUser();
   }, []);
   return isLoading && !email ? (
      <div>Loading</div>
   ) : (
      <ThemeProvider theme={theme}>
         <Provider store={store}>
            <Notifications notifications={notifications} />
            <ConnectedRouter history={history}>
               <div>
                  <div className="main">
                     <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/game/classicEasy" component={ClassicEasy}></Route>
                        {/* <Route exact path="/game/classicMedium" component={}></Route>
                        <Route exact path="/game/classicHard" component={}></Route>
                        <Route exact path="/game/size2x2" component={}></Route>
                        <Route exact path="/game/size2x3" component={}></Route>
                        <Route exact path="/game/size4x4" component={}></Route>
                        <Route exact path="/game/diagonal" component={}></Route>
                        <Route exact path="/game/jigsaw" component={}></Route>
                        <Route exact path="/game/samurai" component={}></Route>
                        <Route exact path="/game/samuraiMixed" component={}></Route> */}
                        <Route path="/login" component={SignInPage} />
                        <Route path="/register" component={SignUpPage} />
                     </Switch>
                  </div>
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
