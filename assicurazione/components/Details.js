import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
  StatusBar,
  AsyncStorage,
  ScrollView,
} from "react-native";
import {
    MapView,
    ImagePicker,
    Permissions,
    Location,
    ImageManipulator
  } from "expo";
import {List, ListItem } from 'react-native-elements'
import * as firebase from "firebase";

const TINT_COLOR = "rgb(4, 159, 239)";

export default class Details extends React.Component {
    state = {
            dueDate: new Date(),
            text: null,
            address: "",
            location: {
            latitude: 37.509433,
            longitude: 15.083707
            },
            isMapVisible: false,
            photo: this.props.navigation.state.params.data.photo,
            shouldRemind: false,
    }

    componentDidMount() {
        
    };

    render() {
        return (

            <ScrollView>
                <View style={styles.wrapper}>
                    <TouchableOpacity onPress={this._selectPhoto}>
                        <Image
                        resizeMode="cover"
                        style={{ width: null, height: 225 }}
                        source={
                            this.state.photo
                            ? { uri: this.state.photo }
                            : require("../assets/image-placeholder.png")
                        }
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.margin, {marginTop: 30}]}>
                     <Text>Data:</Text>
                     <Text>{this.props.navigation.state.params.data.date.substring(0, 10)}</Text>  
                </View>
                <View style={styles.margin}>
                     <Text>Ora:</Text>
                     <Text>{this.props.navigation.state.params.data.date.substring(11, 8)}</Text>  
                </View>
                <View style={styles.margin}>
                     <Text>Note:</Text>  
                     <Text>{this.props.navigation.state.params.data.text}</Text>
                </View>
                <View style={styles.margin}>
                     <Text>Indirizzo:</Text> 
                     <Text>{this.props.navigation.state.params.data.address}</Text>
                    
                </View>
                <MapView
                        style={{ height:200, marginTop: 1 }}
                        region={{
                        ...this.props.navigation.state.params.data.location,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                        }}
                    >
                        <MapView.Marker
                        title={this.props.navigation.state.params.data.address}
                        description={this.props.navigation.state.params.data.address}
                        coordinate={this.props.navigation.state.params.data.location}
                        />
                    </MapView>
            </ScrollView>
        );
    }

};



  


const styles = StyleSheet.create({
    wrapper: { 
        backgroundColor: "#E9E9EF",
        flex: 1
    },
    margin: {
        marginLeft:2,
        backgroundColor: "#fff",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
    },
    todowrapper: {
        marginTop: 30,
        paddingHorizontal: 10,
        backgroundColor: "white",
      },
  });