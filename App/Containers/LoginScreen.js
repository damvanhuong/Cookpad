import React, { Component } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import ImageTextInput from '../Components/ImageTextInput'
import Firebase from '../Config/Firebase'
import Loading from '../Components/Loading'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import UserService from '../Config/UserService';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      userName: 'hantanabkhn@gmail.com',
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
      this.setState({ loading: false })
      this.getUserInfo(user.uid)
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      this.setState({ loading: false })
      alert(errorMessage);
    });
  }

  getUserInfo(uid){
    console.log('getUserInfo', uid)
    var queryText = uid
    Firebase.database().ref('users')
      .orderByChild('uid')
      .startAt(queryText)
      .endAt(queryText + "\uf8ff")
      .once("value", (snapshot) => {
        var userData
        snapshot.forEach(function (child) {
          userData = child.val()
        })
        UserService.userInfo = userData
        AsyncStorage.setItem('userData', JSON.stringify(userData))
        this.props.navigation.navigate('TabBarScreen')
        console.log('User signed in', userData)      })
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
          hintText='Email hoặc tài khoản'
          onValueChange={this.onUserTextChange} />
        <ImageTextInput
          value={this.state.password}
          secureTextEntry={true}
          image={Images.password}
          hintText='Mật khẩu'
          onValueChange={this.onPasswordTextChange} />
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
        <TouchableOpacity style={styles.signInButton} onPress={this.onPressSignIn}>
          <Text style={styles.signInText}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressSignUp}>
          <Text style={styles.signUp}>Chưa có tài khoản? Đăng ký</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

