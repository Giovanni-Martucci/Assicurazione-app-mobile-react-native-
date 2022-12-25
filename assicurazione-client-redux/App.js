import React from "react";
import { createStackNavigator } from "react-navigation";

//IMPORT FROM CONTAINERS
import RoadAccidents from "./src/containers/RoadAccidents";//IMPORTANTE PASSARE ROAD DI "CONTAINERS" NO DI "COMPONENTS"
import AddCard from "./src/containers/AddCard";

//IMPORT FROM COMPONENTS
import Login from "./screens/Login";
import Details from "./src/components/Details";

import thunk from "redux-thunk";

import { createStore, applyMiddleware } from "redux";
import Reducer from "./src/reducers";
import { Provider } from "react-redux";

import * as firebase from "firebase";



const store = createStore(Reducer, applyMiddleware(thunk));

var config = {
  apiKey: "AIzaSyAOQWcSIhSad9BvEM3Aj-psdlEXpJMQUP4",
  authDomain: "assicurazione-6d1c4.firebaseapp.com",
  databaseURL: "https://assicurazione-6d1c4.firebaseio.com",
  projectId: "assicurazione-6d1c4",
  storageBucket: "assicurazione-6d1c4.appspot.com",
  messagingSenderId: "597789520191"
};
!firebase.apps.length ? firebase.initializeApp(config) : null;

const MainNav = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    RoadAccidents: {
      screen: RoadAccidents
    },
    AddCard: {
      screen: AddCard
    },
    Details: {
      screen: Details
    },
    /*Signup: {
      screen: Signup
  },*/

  },
  {
    initialRouteName: "Login"
    
  }
);

const App = () => (
  <Provider store={store}>
    <MainNav />
  </Provider>
);

export default App;

