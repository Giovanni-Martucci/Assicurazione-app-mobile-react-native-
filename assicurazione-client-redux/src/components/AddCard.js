import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Switch,
    TextInput,
    Platform,
    Button,
    Image,
    TouchableOpacity,
    ScrollView,
    ActionSheetIOS,
    ActivityIndicator
} from "react-native";

import {
    MapView,
    ImagePicker,
    Permissions,
    Location,
    ImageManipulator
  } from "expo";

import Cards from './Cards';
import DueDate from './DueDate';
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import uuid from "uuid";

const TINT_COLOR = "rgb(4, 159, 239)";


export default class AddCard extends React.Component {

    state = {
        dueDate: new Date(),
        text: this.props.navigation.state.params.text,
        address: this.props.navigation.state.params.address,
        location: {
        latitude: 37.509433,
        longitude: 15.083707
        },
        isMapVisible: false,
        photo: this.props.navigation.state.params.photo,
        shouldRemind: false,
        
    };

    componentDidMount() {
        this.props.navigation.setParams({onSave: this._save})
        
    };

    _save = () =>{
        const params = this.props.navigation.state.params;

        if(params.id) { //presumo perche passo item (intero) come parametro da roadacc... e quindi lo leggo direttamente perche dall'altra parte era come se face id:item.id
          const newcard = {
            id:params.id,
            ...this.state,
            date: this.state.dueDate.toISOString(), //perche nello state verebbe passato senza toISOstring , e quindi non verrebbe convertito per essere mostrato
            
          }
          this.props.mod(newcard);

          this.props.navigation.goBack();
        }
        else {
        const newcard = {
            ...this.state,
            date: this.state.dueDate.toISOString(),
            
        }
       
        this.props.add(newcard);
        this.props.navigation.goBack();
      }
    };

    _selectPhoto = () => {
        console.log("show action sheet");
        if (Platform.OS === "ios") {
          ActionSheetIOS.showActionSheetWithOptions(
            {
              options: ["Camera", "Photo Gallery", "Cancel"],
              cancelButtonIndex: 2,
              title: "Choose a picture from"
            },
            btnIndex => {
              if (btnIndex == 0) {
                  this._takepicture();
              } else if (btnIndex == 1) {
                this._openPhotoGallery();
              }
            }
          );
        } else {
          // You can use an Alert Dialog on Android to do the same
        }
      };
      _openPhotoGallery = async () => {
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (result.status !== "granted") {
            alert("you need to authorized the app");
            return;
          }
        }
        let result = await ImagePicker.launchImageLibraryAsync(); //aspetta la scelta dell'immagine
        if (!result.cancelled) {
          console.log(result);
          // Resize the image
          const manipResult = await ImageManipulator.manipulate(
            result.uri,
            [{ resize: { width: 375 } }],
            { format: "png" }
          );
          console.log(manipResult);
          this.setState({ photo: manipResult.uri });
        }
      };

      _takepicture = async () => {
        const { status } = await Permissions.getAsync(Permissions.CAMERA);
        if (status !== "granted") {
          const result = await Permissions.askAsync(Permissions.CAMERA);
          if (result.status !== "granted") {
            alert("you need to authorized the app");
            return;
          }
        } 
        let result = await ImagePicker.launchCameraAsync();
        if (!result.cancelled) {
            console.log(result);
            // Resize the image
            const manipResult = await ImageManipulator.manipulate(
              result.uri,
              [{ resize: { width: 375 } }],
              { format: "png" }
            );
            console.log(manipResult);
            this.setState({ photo: manipResult.uri });
          }
      };
    

    _locateItem = async () => {
        if (this.state.isMapVisible) {
          this.setState({ isMapVisible: false });
          return;
        }
        if (this.state.address) {
          //console.log(this.state.location);
          // se l'utente ha inserito un indirizzo, determina le coordinate con il
          try {
            var results = await Location.geocodeAsync(this.state.address);
            this.setState({ location: results[0], isMapVisible: true });
          } catch (e) {
            console.log("error in geocoding");
            console.log(e);
          }
    
          //console.log("risultati: ", results);
          // cambia lo stato con la location e mostrando la mappa
        } else {
          // se l'utente non ha inserito un indirizzo, allora chiedi al GPS la posizione corrente
          // dell'utente e poi usa il reverse geocoder per ottenere l'indirizzo a partire dalla
          // posizione ottenuta
          let { status } = await Permissions.askAsync(Permissions.LOCATION);
          if (status !== "granted") {
            alert("You need to enable the GPS and authorize it");
            return;
          }
    
          let location = await Location.getCurrentPositionAsync();
          console.log(location);
          this.setState({ location: location.coords, isMapVisible: true });
          let address = await Location.reverseGeocodeAsync(location.coords);
          this.setState({
            address: address[0].city + ", " + address[0].name
          });
          console.log(address);
        }
      };

    render() {
        return (
            <ScrollView>          
                <View style={styles.wrapper}>
//foto          <TouchableOpacity onPress={this._selectPhoto}>
                    <Image
                    resizeMode="cover"
                    style={{ width: null, height: 220 }}
                    source={
                        this.state.photo
                        ? { uri: this.state.photo }
                        : require("../../assets/image-placeholder.png")
                    }
                    />
                </TouchableOpacity>
                  <View style={[styles.rowwrapper, { padding: 15, marginTop: 0 }]}>
                  <TextInput 
                      value={this.state.text}
                      onChangeText={ text => this.setState({text: text})}
                      placeholder="Scrivi qualcosa...opzionale"
                      underlineColorAndroid={TINT_COLOR}
                  />
                  </View>

                    <View style={styles.rowwrapper}>
  //picker                  
                    <View style={[styles.rowwrapper, { marginTop: 0 }]}>
                        <View style={styles.remindRow}>
                        <Text style={styles.label}>Remind me</Text>
                        <Switch
                            value={this.state.shouldRemind}
                            onValueChange={value => this.setState({ shouldRemind: value })}
                            onTintColor={TINT_COLOR}
                        />
                        </View>

//data                        
                        <DueDate 
                            dueDate={this.state.dueDate}
                            onDateChange={value => this.setState({ dueDate: value })}
                        />
                    </View>
                    
                    
                    </View>
//mappa
                    <View style={[styles.rowwrapper, { padding: 0, marginTop: 1 }]}>
                        <View style={styles.remindRow}>
                            <TextInput
                                value={this.state.address}
                                style={[styles.textInputStyleOnAndroid, styles.label]}
                                placeholder="Where"
                                underlineColorAndroid={TINT_COLOR}
                                onChangeText={value => this.setState({ address: value })}
                                
                            />
                            <TouchableOpacity onPress={this._locateItem}>
                                <Image
                                source={require("../../assets/locateme.png")}
                                style={{ height: 35, width: 40 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <MapView
                        style={{ height: this.state.isMapVisible ? 200 : 0, marginTop: 0 }}
                        region={{
                        ...this.state.location,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                        }}
                    >
                        <MapView.Marker
                        title={this.state.address}
                        description={this.state.address}
                        coordinate={this.state.location}
                        />
                    </MapView>
                </View>
            </ScrollView>
            
        );
    };
};

AddCard.navigationOptions = ({ navigation }) => ({
    title: "AddCard",
    headerLeft: <Button title="Cancel" onPress={() => navigation.goBack()} />,
    headerRight: (
      <TouchableOpacity onPress={navigation.state.params.onSave}> //equivale a () => navigation.state.params.onSave()
        <Text style={styles.headerBtn}>
          {Platform.OS === "ios" ? "Aggiungi" : "AGGIUNGI"}
        </Text>
      </TouchableOpacity>
    )
  });
  
  const styles = StyleSheet.create({
    wrapper: { backgroundColor: "#E9E9EF", flex: 1 },

    rowwrapper: {
      marginTop: 30,
      paddingHorizontal: 10,
      backgroundColor: "white"
    },
    textInputStyleOnAndroid:
      Platform.OS === "android" ? { paddingBottom: 7, paddingLeft: 7 } : {},
    remindRow: {
      borderBottomWidth: 1,
      borderBottomColor: "#dddddd",
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    label: {
      fontSize: 18
    },
    headerBtn: {
      color: Platform.OS === "ios" ? TINT_COLOR : "white",
      padding: 10,
      fontSize: 18
    }
  });
