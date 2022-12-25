import { createStackNavigator } from "react-navigation";

import RoadAccidents from "./components/RoadAccidents";
import Login from "./screens/Login";
import AddCard from "./components/AddCard";
import Details from "./components/Details";

import * as firebase from "firebase";

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
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


