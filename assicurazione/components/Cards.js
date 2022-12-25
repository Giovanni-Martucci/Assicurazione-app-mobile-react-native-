import React from "react";
import {
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

import { Card, List, ListItem } from 'react-native-elements'

export default class Todo extends React.Component {


  render() {
    return (
      
      <Card
      title={this.props.data.date}
      image={{uri: this.props.data.photo}}>
      <Text style={{marginBottom: 10}}>
          {this.props.data.text}
      </Text>
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
