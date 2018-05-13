import React, { Component } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import ImageTextInput from '../Components/ImageTextInput'
import Firebase from '../Config/Firebase'
import Loading from '../Components/Loading'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

export default class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      userName: 'hantanabka@gmail.com',
      password: '12345678'
    }

    this.onUserTextChange = this.onUserTextChange.bind(this)
    this.onPasswordTextChange = this.onPasswordTextChange.bind(this)
    this.onPressSignIn = this.onPressSignIn.bind(this)
    this.onPressSignUp = this.onPressSignUp.bind(this)
  }

  onUserTextChange(text) {
    this.setState({ userName: text })
  }

  onPasswordTextChange(text) {
    this.setState({ password: text })
  }

  onPressSignIn() {
    this.setState({ loading: true })
    Firebase.auth().signInWithEmailAndPassword(this.state.userName, this.state.password).then(user => {
      // user signed in
      this.setState({ loading: false })
      this.props.navigation.navigate('TabBarScreen')
      console.log('User signed in', user)
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      this.setState({ loading: false })
      alert(errorMessage);
    });
  }

  onPressSignUp() {
    this.props.navigation.navigate('RegisterScreen')
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={Images.bgLogin}>
        <Loading show={this.state.loading} />
        <ImageTextInput
          value={this.state.userName}
          image={Images.userName}
          hintText='Username'
          onValueChange={this.onUserTextChange} />
        <ImageTextInput
          value={this.state.password}
          secureTextEntry={true}
          image={Images.password}
          hintText='Password'
          onValueChange={this.onPasswordTextChange} />
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <TouchableOpacity style={styles.signInButton} onPress={this.onPressSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressSignUp}>
          <Text style={styles.signUp}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

