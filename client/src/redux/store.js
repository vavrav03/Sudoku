import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import { createRootReducer } from "./reducers";
import history from "../history";
import thunk from "redux-thunk";

export const configureStore = (history) => {
   const persistedState = loadFromLocalStorage();
   const functionMiddleware = [];

   const coreMiddleware = [routerMiddleware(history), thunk];

   return createStore(
      createRootReducer(history),
      persistedState,
      composeWithDevTools({trace: true})(applyMiddleware(...functionMiddleware, ...coreMiddleware))
   );
};
export const store = configureStore(history);

function saveToLocalStorage(state) {
   try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
   } catch (e) {
      console.log(e);
   }
}

function loadFromLocalStorage() {
   try {
      const serializedState = localStorage.getItem("state");
      if (serializedState === null) {
         return undefined;
      }
      return JSON.parse(serializedState);
   } catch (e) {
      console.log(e);
      return undefined;
   }
}

//in order to make the redux state persistent between page refreshes, we need to store it in local storage
store.subscribe(() => {
   return saveToLocalStorage(store.getState());
});

export const dispatch = store.dispatch;;
export default store;