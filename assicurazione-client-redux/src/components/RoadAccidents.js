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

const TINT_COLOR = "rgb(4, 159, 239)";


export default class RoadAccidents extends React.Component {

  
  componentDidMount() {
    const uid = firebase.auth().currentUser.uid; //in questo caso uid dell'amministratore
    this.uid = uid; //la rendo prorietà della classe , cosi da porterla usare dappertutto all0interno della clase
    
    
    this.props.loadList();


    this.props.navigation.setParams({add: this._add});
    
    
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
   
    // if(todo) {
    //   const response = await fetch(todo.photo);
    //   const blob = await response.blob();
    //   const ref = firebase  
    //               .storage()
    //               .ref()
    //               .child(this.uid + "/" + uuid.v4());
    //   const uploadStatus = await ref.put(blob);

    //   var downloadURL = await uploadStatus.ref.getDownloadURL();
    //   console.log(downloadURL);
    //   todo.photoURL = downloadURL;
    //   delete todo.photo;     
    // }

    // console.log("sto per caricare...");
    // firebase
    // .database()
    // .ref("/users/" + this.uid + "/roadaccidents/")
    // .push(todo);
    
    //this.props.add(todo);  <-- SPOSTATO DIRETTAMENTE NEL "addcard" PERCHE TANTO ANCHE LUI HA LO STORE PASSATO CON PROVIDER E ACCEDE DIRETT ALLA FUNZ
    
  };





  _modintera = newitem => {
    // const newrow = this.props.roadaccidents.map(//perforza con map , forEach non funziona
    //   row => {
    //     row.id===newitem.id ? newitem : null;  
    //   }
    // )
    // console.log("sto per modificare la riga  " + newitem.id)
    // if(newrow){
    //   const id = newitem.id;
    //   delete newitem.id;
    //   firebase
    //       .database()
    //       .ref("/users/" + this.uid + "/roadaccidents/" + id)
    //       .set(newitem);
    // }
    // this.props.mod(newitem);
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


  render() {
    return(
      <View style={styles.container}>
      <FlatList
        data={this.props.roadaccidents}
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
