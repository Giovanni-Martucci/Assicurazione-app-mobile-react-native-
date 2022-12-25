import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
  StatusBar,
  AsyncStorage
} from "react-native";
import { Card, List, ListItem } from 'react-native-elements'
import Cards from './Cards';
import * as firebase from "firebase";
import uuid from "uuid";
import Details from './Details';


export default class SinglePerson extends React.Component {
    static navigationOptions = {
        title: "Sinistri stradali"
      };
    state = {
        roadaccidents: []
    }
    
    
    componentDidMount() {
        const params = this.props.navigation.state.params;

        if(params.pid) {
            firebase
            .database()
            .ref("/users/"+params.pid+"/roadaccidents/")
            .on("value", snap => {
                let roadaccidents = [];
                snap.forEach(child => {
                    roadaccidents.push({
                        id: child.key,
                        ...child.val(),
                        photo: child.val().photoURL,
                    });
                });
                this.setState({ roadaccidents });
            });
        }
    };


    renderRow = ({item}) => {
        return (
            <Cards 
             data={item} 
             onDetails={() => this._details(item)}
            /> 
        );
    };

    _keyExtractor = (item,index) => {
        return String(index);
    };

    _details = (item) => {

        if(item) {
            const params = this.props.navigation.state.params;
            this.props.navigation.navigate("Details", {
                data:item,
            });
        }
    };

    render() {
      return(
        <View style={styles.container}>
        <FlatList
          data={this.state.roadaccidents.sort(this.props.navigation.state.params.onSort)}
          renderItem={this.renderRow}
          keyExtractor={this._keyExtractor}
        />
        </View>
      );
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      //alignItems: 'center',
      justifyContent: "center",
      // paddingTop: Constants.statusBarHeight,
      backgroundColor: "white"
    }
  });
  