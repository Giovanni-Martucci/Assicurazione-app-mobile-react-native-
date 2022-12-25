import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { List, ListItem } from 'react-native-elements'
import Swipeout from "react-native-swipeout";
import { Entypo } from "@expo/vector-icons";
const TINT_COLOR = "rgb(4, 159, 239)";


export default class Todo extends React.Component {



  render() {
    return (
      <Swipeout
        autoClose
        onClose={this.props.onDelete}
        right={[{ type: "delete", text: "Delete" }]}
      >
      <TouchableOpacity onPress={this.props.onInfo} >
        <View style={styles.row}>
        <ListItem style={{flex:3}}
          roundAvatar
          title={`${this.props.data.surname} ${this.props.data.name}`}
          subtitle={this.props.data.email}
          avatar={this.props.data.avatar}
          containerStyle={{borderBottomWidth: 0}}
        />
        {/* <View style={{flex:1}}>
        {this.props.onToken ? (
          <Entypo name="app-store" size={28} color={TINT_COLOR}/>
        ) : null
        }
        </View> */}
            
        </View>
      </TouchableOpacity>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: "white",
    
  },
});

