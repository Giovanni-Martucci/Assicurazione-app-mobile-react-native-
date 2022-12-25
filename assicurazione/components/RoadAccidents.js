import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar,
  AsyncStorage
} from "react-native";
import Row from './Row';
import SinglePerson from './SinglePerson';

import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import uuid from "uuid";
import { Permissions, Notifications } from 'expo';


const TINT_COLOR = "rgb(4, 159, 239)";


export default class RoadAccidents extends React.Component {

  state = {
    roadaccidents: [],
    token: "",
    tokenArrived: true,
  };
  renderRow = ({ item }) => {
    return (
        <Row 
          data={item}
          onTokenArrived={this.state.tokenArrived}
          onInfo={ () => this._info(item.pid)}//glie lo passo da qui il param e non nel file Row xkè cmq di ogni riga gia lo so qual'e l'id che sarà lo stesso di quello di data che poi mi verrebbe restituito dall'altra parte(Row.js) in this.props.data.id
          onDelete={ () => this._delete(item)} //info lho passato specifico item.id , infatti nel metodo lho tratto come una normale variabile (id) invece qui item.id lo faccio nel metodo _delete
        />
    );   
};


  _keyExtractor = (item, index) => {
    // aggiungere un id ad ogni elemento pari alla sua posizione
    //item.id = index;
    return String(index); //in questo modo si va a prendere l'id che si prende con child.key per ogni riga
  };

  _info = id => {
    console.log("vadooooooo");
    if(id) {
      console.log("in mezzo");
      this.props.navigation.navigate("SinglePerson", {
        pid: id,
        onSort: this._sortarray, 
      });
    }
    console.log("tornoxoooo");
  };

  _sortarray = (item,item2) => {
      if(item.surname > item2.surname) {
        return 1;
      }
      else {
        return -1;
      }
  };

  _delete = item => {
    setTimeout(() => {
      firebase
        .database()
        .ref("administrator/" + item.id)
        .remove();
    }, 300);
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

   _handleNotification = (notifica) => {
    //  console.log(notifica);
    //  this.setState( {
    //    message: [...this.state.message,{text: notifica.data.todo.text}]
    //  })
    this.setState({tokenArrived: true});
   };


  componentDidMount() {
    
    const uid = firebase.auth().currentUser.uid; //in questo caso uid dell'amministratore
    this.uid = uid; //la rendo prorietà della classe , cosi da porterla usare dappertutto all0interno della clase
    if (uid) {
      firebase
        .database()
        .ref("/administrator/")
        .on("value", snap => {
          let roadaccidents = [];
          snap.forEach(child => {
            roadaccidents.push({
              id: child.key,
              ...child.val()
            });
          });
          this.setState({ roadaccidents });          
        });
    }

    this.registerForPushNotificationsAsync();

    Notifications.addListener(this._handleNotification);
  }
  //1. STEP FOR PUSH-NOTIFICATION
  registerForPushNotificationsAsync = async () => {
    console.log("effettuo registertoken");
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    console.log("...registertoken");
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
    console.log(" registertoken FATTO!");
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    
    this.setState({token});
    
    firebase
    .database()
    .ref("/token/")
    .push(token);
    console.log("caricato su firebase")
    console.log(token);
  };
 
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.roadaccidents.sort(this._sortarray)}
          renderItem={this.renderRow}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

RoadAccidents.navigationOptions = ({ navigation }) => {
  return {
    title: "Clienti",
    headerStyle: {
      backgroundColor: TINT_COLOR
    },
    headerTintColor: "white",
    headerLeft: null,
    headerRight: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Login")
        }
      >
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "white"
  },
  logout: {
    fontSize: 18,
    marginRight: Platform.OS === "ios" ? 10 : 0 ,
    marginBottom: 2,
    color: "white"
  },
});
