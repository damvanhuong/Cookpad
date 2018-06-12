import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import Header from '../Components/Header'
import ImageTextInput from '../Components/ImageTextInput'
import Firebase from '../Config/Firebase'
import Loading from '../Components/Loading'
import { Metrics, Images, Colors } from '../Themes';
import Validate from '../Lib/Validate'

// Styles
import styles from './Styles/ChangePasswordScreenStyle'

export default class ChangePasswordScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      loading: false
    }

    this.goBack = this.goBack.bind(this)
    this.onEmailTextChange = this.onEmailTextChange.bind(this)
    this.onPasswordTextChange = this.onPasswordTextChange.bind(this)
    this.onNewPasswordTextChange = this.onNewPasswordTextChange.bind(this)
    this.onConfirmPasswordTextChange = this.onConfirmPasswordTextChange.bind(this)
    this.onPressChange = this.onPressChange.bind(this)
  }

  goBack() {
    this.props.navigation.goBack()
  }

  onEmailTextChange(text) {
    this.setState({ email: text })
  }

  onPasswordTextChange(text) {
    this.setState({ password: text })
  }

  onNewPasswordTextChange(text) {
    this.setState({ newPassword: text })
  }

  onConfirmPasswordTextChange(text) {
    this.setState({ confirmPassword: text })
  }

  validate() {
    if (!Validate.validateEmail(this.state)) {
      alert('Vui lòng nhập email');
      return false
    }
    else if (this.state.password === '') {
      alert('Vui lòng nhập mật khẩu');
      return false
    }
    else if (this.state.newPassword === '') {
      alert('Vui lòng nhập mật khẩu mới');
      return false
    }
    else if (this.state.confirmPassword === '') {
      alert('Vui lòng nhập lại mật khẩu mới');
      return false
    }
    else if (this.state.newPassword !== this.state.confirmPassword) {
      alert('Mật khẩu mới không giống nhau');
      return false
    }
    else return true
  }
  onPressChange() {
    if (!this.validate()) {
      return
    }

    this.setState({ loading: true })
    Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(user => {
      var user = Firebase.auth().currentUser;
      var newPassword = this.state.newPassword

      user.updatePassword(newPassword).then(() => {
        console.log('Update password successful')
        this.setState({ loading: false })
        alert('Bạn đã thay đổi mật khẩu thành công');
      }).catch(error => {
        this.setState({ loading: false })
        console.log(error)
      })
    }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      this.setState({ loading: false })
      alert('Lỗi thay đổi mật khẩu');
    });
  }

  render() {
    return (
      <View flex={1}>
        <Header onLeftPress={this.goBack} title='Thay đổi mật khẩu' />
        <View style={styles.container}>
          <ImageTextInput
            value={this.state.email}
            image={Images.email}
            hintText='Email'
            onValueChange={this.onEmailTextChange} />
          <ImageTextInput
            value={this.state.password}
            secureTextEntry={true}
            image={Images.password}
            hintText='Mật khẩu'
            onValueChange={this.onPasswordTextChange} />
          <ImageTextInput
            value={this.state.newPassword}
            secureTextEntry={true}
            image={Images.password}
            hintText='Mật khẩu mới'
            onValueChange={this.onNewPasswordTextChange} />
          <ImageTextInput
            value={this.state.confirmPassword}
            secureTextEntry={true}
            image={Images.password}
            hintText='Nhập lại mật khẩu'
            onValueChange={this.onConfirmPasswordTextChange} />
          <TouchableOpacity style={styles.saveButton} onPress={this.onPressChange}>
            <Text style={styles.saveText}>Lưu</Text>
          </TouchableOpacity>
        </View>
        <Loading show={this.state.loading} color={Colors.main} backgroundColor={Colors.transparent} />
      </View>
    )
  }
}
