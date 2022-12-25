import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

import { Card, List, ListItem } from 'react-native-elements'

export default class Cards extends React.Component {
  componentDidMount() {
    console.log(this.props.data.photoURL)

  }
    
  render() {
    return (
      
      <Card
      title={this.props.data.date.substring(0, 10)}
      image={{uri: this.props.data.photoURL}}>
      <View style={styles.container}>
      <Text style={{marginBottom: 10, fontSize:18}}>
          {this.props.data.address}
      </Text>
      <TouchableOpacity onPress={this.props.modificaCards}>
      <Text style={{marginBottom: 10, fontSize:18, color: "#03A9F4"}}>
          Modifica
      </Text>
      </TouchableOpacity>
      </View>
      <Button
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          fontFamily='Lato'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,}}
          title='VIEW NOW'
          onPress={this.props.onDetails} />
      </Card>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

});