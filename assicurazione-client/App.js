import { createStackNavigator } from "react-navigation";

import RoadAccidents from "./components/RoadAccidents";
import Login from "./screens/Login";
import AddCard from "./components/AddCard";
import Details from "./components/Details";

import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyAOQWcSIhSad9BvEM3Aj-psdlEXpJMQUP4",
  authDomain: "assicurazione-6d1c4.firebaseapp.com",
  databaseURL: "https://assicurazione-6d1c4.firebaseio.com",
  projectId: "assicurazione-6d1c4",
  storageBucket: "assicurazione-6d1c4.appspot.com",
  messagingSenderId: "597789520191"
};
!firebase.apps.length ? firebase.initializeApp(config) : null;

const App = createStackNavigator(
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
export default App;


