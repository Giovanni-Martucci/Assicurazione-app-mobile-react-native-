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
import Cards from './Cards';

import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import uuid from "uuid";

import { Permissions, Notifications } from 'expo';

const TINT_COLOR = "rgb(4, 159, 239)";
const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";

export default class RoadAccidents extends React.Component {
  state={
    roadaccidents: [],
    token: "", 
    tokenAdmin: ""
  }
  
  // _handleNotification = (notifica) => {
  //   console.log(notifica);
  //   this.setState( {
  //     message: [...this.state.message,{text: notifica.data.todo.text}]
  //   })
  // }

  componentDidMount() {
    const uid = firebase.auth().currentUser.uid; //in questo caso uid dell'amministratore
    this.uid = uid; //la rendo prorietà della classe , cosi da porterla usare dappertutto all0interno della clase
    if(uid){
      firebase
      .database()
      .ref("/users/" + this.uid + "/roadaccidents/")
      .on("value", snap => {
        let roadaccidents = [];
        snap.forEach(child => { //per forza con forEach, map non funziona in qst caso
          roadaccidents.push({
            id:child.key,
            ...child.val()
          });
          
        });
        this.setState({roadaccidents});//quando ha lo stesso nome della var nello state si puo fare cosi

      });
    }

    this.props.navigation.setParams({add: this._add});


  //  //1.STEP FOR PUSH-NOTIF 
  //   this.registerForPushNotificationsAsync();

  // //2.STEP for push 
  // Notifications.addListener(this._handleNotification);
    
  }


  renderRow = ({item}) => {
    return(
    <Cards 
      data={item}
      modificaCards={() => this._modifica(item)}
      onDetails={() => this._details(item)}
    />
    );
  };
  _keyExtractor = (item,index) => {
    return String(index);
  };




  _add = async todo => {
    if(todo) {
      const response = await fetch(todo.photo);
       const blob = await response.blob();
       const ref = firebase  
                   .storage()
                   .ref()
                   .child(this.uid + "/" + uuid.v4());
       const uploadStatus = await ref.put(blob);

       var downloadURL = await uploadStatus.ref.getDownloadURL();
       console.log(downloadURL + "su storage...");
       todo.photoURL = downloadURL;
       delete todo.photo;     
     }

    console.log("sto per caricare...");
    firebase
      .database()
      .ref("users/" + this.uid + "/roadaccidents/")
      .push(todo);
    console.log("dovrebbe aber caricato");
    
    
    //this._sendNotification(this.tokenAdmin);     
  };

  // //INVIO LA NOTIFICA ALL'ADMIN CHE HO FATTO UN UPLOAD
  // _sendNotification = destToken => {
  //   fetch(PUSH_ENDPOINT, {
  //     method: "POST",
  //     headers: {
  //      Accept: "application/json",
  //      "accept-encoding": "gzip, deflate",
  //      "content-type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       to: destToken,
  //       title: "Upload",
  //       body: todo.text.subString(1,5) + "...",
  //       data: { todo: todo,  //data è un oggetto JSON che serve a passare parametri (in qst caso tutto il todo e il from) 
  //                            //cosi che dallhandler si fa notifica.data.todo o notifica.data.from -UN PASSAGIO DI PARAAMETRI VA
  //              from: firebase.auth().currentUser.email,
              
  //       },
  //       sound: "default"
  //     })
  //   })
  // }





  _modintera = async newitem => {
    const newrow = this.state.roadaccidents.map(//perforza con map , forEach non funziona
      row => {
        row.id===newitem.id ? newitem : null;  
      }
    )
    console.log("sto per modificare la riga  " + newitem.id)
    if(newrow){
      
        const response = await fetch(newitem.photo);
         const blob = await response.blob();
         const ref = firebase  
                     .storage()
                     .ref()
                     .child(this.uid + "/" + uuid.v4());
         const uploadStatus = await ref.put(blob);
  
         var downloadURL = await uploadStatus.ref.getDownloadURL();
         console.log(downloadURL + "su storage...");
         newitem.photoURL = downloadURL;
         delete newitem.photo;     
       
      const id = newitem.id;
      delete newitem.id;
      firebase
          .database()
          .ref("/users/" + this.uid + "/roadaccidents/" + id)
          .set(newitem);
    }
  };

  /*_modparziale =  newitem => {
    this.state.RoadAccidents.map(
      row => {
        row.id===newitem.id ? 
        firebase
        .database()
        .ref("/users/" + this.uid + "/roadaccidents/" + newitem.id)
        .update({...row,...newitem,id:null}) : null;
      }
    )
  };*/

  _modifica = item => {
    this.props.navigation.navigate("AddCard", {
      modint: this._modintera,
      ...item
    })
   
  };

  
  _details = item => {
    this.props.navigation.navigate("Details", {
      data:item,
    });
  };
// //1. STEP FOR PUSH-NOTIFICATION
//   registerForPushNotificationsAsync = async () => {
//     console.log("effettuo registertoken");
//     const { status: existingStatus } = await Permissions.getAsync(
//       Permissions.NOTIFICATIONS
//     );
//     let finalStatus = existingStatus;
  
//     // only ask if permissions have not already been determined, because
//     // iOS won't necessarily prompt the user a second time.
//     if (existingStatus !== 'granted') {
//       // Android remote notification permissions are granted during the app
//       // install, so this will only ask on iOS
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
//     console.log("...registertoken");
//     // Stop here if the user did not grant permissions
//     if (finalStatus !== 'granted') {
//       return;
//     }
//     console.log(" registertoken FATTO!");
//     // Get the token that uniquely identifies this device
//     let token = await Notifications.getExpoPushTokenAsync();
    
//     this.setState({token});
    
//     console.log(token);
//   };

  


  render() {
    return(
      <View style={styles.container}>
      <FlatList
        data={this.state.roadaccidents}
        renderItem={this.renderRow}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={this._separator}
      />
      </View>
    );
  };
};


RoadAccidents.navigationOptions = ({ navigation }) => {
  return {
    title: "Incidenti",
    headerStyle: {
      backgroundColor: TINT_COLOR
    },
    headerTintColor: "white",
    headerLeft: null,
    headerRight: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AddCard", {
            onAdd: navigation.state.params.add
          })//se devo pass para qui non si puo usare this. quindi casomai si caricano sullo state della navigation in componentdidmount e qui si prendono dallo state del naviga
        }
      >
        <Ionicons
          style={{ paddingHorizontal: 15 }}
          name="ios-add-outline"
          size={34}
          color="white"
        />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
