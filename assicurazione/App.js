import { createStackNavigator } from "react-navigation";

import RoadAccidents from "./components/RoadAccidents";
import Login from "./screens/Login";
import SinglePerson from './components/SinglePerson';
import Details from './components/Details';
//import Signup from './components/Signup';
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyAOQWcSIhSad9BvEM3Aj-psdlEXpJMQUP4",
  authDomain: "assicurazione-6d1c4.firebaseapp.com",
  databaseURL: "https://assicurazione-6d1c4.firebaseio.com",
  projectId: "assicurazione-6d1c4",
  storageBucket: "",
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
    SinglePerson: {
      screen: SinglePerson
    },
    Details: {
      screen: Details
    },
   /* Signup: {
      screen: Signup
  },*/

  },
  {
    initialRouteName: "Login"
    
  }
);
export default App;


