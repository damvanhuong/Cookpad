import React, { Component } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import ImageTextInput from '../Components/ImageTextInput'
import Firebase from '../Config/Firebase'
import UserService from '../Config/UserService';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RegisterScreenStyle'

export default class RegisterScreen extends Component {

  constructor(props) {
    super(props)

    this.state = { userName: '', email: '', password: '', confirmPassword: '' }

    this.onUserTextChange = this.onUserTextChange.bind(this)
    this.onEmailTextChange = this.onEmailTextChange.bind(this)
    this.onPasswordTextChange = this.onPasswordTextChange.bind(this)
    this.onConfirmPasswordTextChange = this.onConfirmPasswordTextChange.bind(this)
    this.onBack = this.onBack.bind(this)
    this.onPressSignUp = this.onPressSignUp.bind(this)
  }

  onUserTextChange(text) {

  }

  onEmailTextChange(text) {
    this.setState({ email: text })
  }

  onPasswordTextChange(text) {
    this.setState({ password: text })
  }

  onConfirmPasswordTextChange(text) {

  }

  onBack() {
    this.props.navigation.pop()
  }

  onPressSignUp() {
    HUD.show()
    console.log('onPressSignUp', this.state.email, this.state.password)
    Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {
      // user signed up
      console.log('User signed up', user)
      var userData = { email: this.state.email, uid: user.uid }
      UserService.userInfo = userData
      AsyncStorage.setItem('userData', JSON.stringify(userData))

      Firebase.database().ref('users').push({
        email: this.state.email,
        uid: user.uid,
        userName: this.state.userName
      }).then(() => {
        this.props.navigation.navigate('TabBarScreen')
        console.log('INSERTED !')
      }).catch(error => { console.log(error) })
      HUD.dismiss()
    }).catch(function (error) {
      HUD.dismiss()
      alert(error.message)
    });
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={Images.bgLogin}>
        <ImageTextInput
          image={Images.userName}
          hintText='Họ tên'
          onValueChange={this.onUserTextChange} />
        <ImageTextInput
          image={Images.email}
          hintText='Email'
          onValueChange={this.onEmailTextChange} />
        <ImageTextInput
          secureTextEntry={true}
          image={Images.password}
          hintText='Mật khẩu'
          onValueChange={this.onPasswordTextChange} />
        <ImageTextInput
          secureTextEntry={true}
          image={Images.password}
          hintText='Nhập lại mật khẩu'
          onValueChange={this.onConfirmPasswordTextChange} />
        <TouchableOpacity style={styles.signUpButton} onPress={this.onPressSignUp}>
          <Text style={styles.signUpText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onBack}>
          <Text style={styles.signIn}>Đã có tài khoản rồi? Đăng nhập</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}
