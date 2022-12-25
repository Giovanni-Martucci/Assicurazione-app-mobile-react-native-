import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

import * as firebase from "firebase";

const TINT_COLOR = "rgb(4, 159, 239)";

class LoginForm extends Component {
  static navigationOptions = {
    title: "Login"
  };
  state = {
    isLoading: false,
    email: "chiavetta@mail.com",
    password: "cinemaparadiso",
    error: ""
  };

  componentDidMount() {
    //this._login();
  }

  _login = () => {
    this.setState({ isLoading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.setState({ isLoading: false });
        // console.log(user);
        this.props.navigation.navigate("RoadAccidents");
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message });
        //alert(error.message);
      });
  };

  _reg = () => {
    this.props.navigation.navigate("Signup");
  };

  _signUp = () => {
    this.setState({ isLoading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.setState({ isLoading: false });
        // console.log(user);
        this.props.navigation.navigate("RoadAccidents");
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message });
        //alert(error.message);
      });
  };

  renderLoginOrSpinner() {
    return (
      <View style={{ justifyContent: "space-between", height: "40%", marginTop: 10 }}>
        <Button
          loading={this.state.isLoading}
          raised
          backgroundColor={TINT_COLOR}
          title="Login"
          onPress={this._login}
        />
        <Button
          raised
          loading={this.state.isLoading}
          backgroundColor={TINT_COLOR}
          title="Register"
          onPress={this._reg} //dove avro la fase di reg da parte dell'ammi qndi richiedere conn come numeri contatti via ecc
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <FormLabel>E-mail</FormLabel>
          <FormInput
            label="E-mail"
            placeholder="enter a valid e-mail"
            onChangeText={text => this.setState({ email: text })}
            //value={this.state.email}
          />

          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            label="Password"
            placeholder="your password"
            onChangeText={text => this.setState({ password: text })}
            //value={this.state.password}
          />

          {this.renderLoginOrSpinner()}
          <Text>{this.state.error}</Text>
        </Card>
      </View>
    );
  }
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: "column",
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: Platform.OS ==="ios" ? 20:25,
  },
});

export default LoginForm;
