import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import Header from '../Components/Header'
import UserService from '../Config/UserService'
import { connect } from 'react-redux'
import Firebase from '../Config/Firebase'
import ImagePickerController from '../Lib/ImagePickerController'
import FirebaseController from '../Lib/FirebaseController'
import ImageTextInput from '../Components/ImageTextInput'
import Loading from '../Components/Loading'
import { Metrics, Images, Colors } from '../Themes';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditProfileScreenStyle'

class EditProfileScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      image: UserService.userInfo.avatar ? UserService.userInfo.avatar : null,
      isSelectedImage: false,
      userName: UserService.userInfo.userName,
      loading: false
    }

    this.goBack = this.goBack.bind(this)
    this.showImagePicker = this.showImagePicker.bind(this)
    this.onUserTextChange = this.onUserTextChange.bind(this)
    this.onUpdateUserInfo = this.onUpdateUserInfo.bind(this)
  }

  goBack() {
    this.props.navigation.goBack()
  }

  showImagePicker() {
    ImagePickerController.showImagePicker().then(uri => {
      this.setState({ image: uri, isSelectedImage: true })
    })
  }

  onUserTextChange(text) {
    this.setState({ userName: text })
  }

  updateUserName(ref) {
    Firebase.database().ref(ref).update({
      userName: this.state.userName
    }).then(() => {
      this.setState({ loading: false })
      UserService.userInfo.userName = this.state.userName
      AsyncStorage.setItem('userData', JSON.stringify(UserService.userInfo))
      setTimeout(() => this.props.navigation.goBack(), 500)
      console.log('Update user info successfully !')
    }).catch(error => {
      this.setState({ loading: false })
      console.log(error)
    })
  }

  updateAvaterAndUserName(ref) {
    //Upload image
    FirebaseController.uploadImage(this.state.image, 'image/jpeg').then(url => {
      // upload database
      Firebase.database().ref(ref).update({
        avatar: url,
        userName: this.state.userName
      }).then(() => {
        this.setState({ loading: false })
        UserService.userInfo.userName = this.state.userName
        UserService.userInfo.avatar = this.state.image
        AsyncStorage.setItem('userData', JSON.stringify(UserService.userInfo))
        setTimeout(() => this.props.navigation.goBack(), 500)
        console.log('Update user info successfully !')
      }).catch(error => {
        this.setState({ loading: false })
        console.log(error)
      })
    })
      .catch(error => {
        this.setState({ loading: false })
        console.log(error)
      }
      )
  }

  onUpdateUserInfo() {
    this.setState({ loading: true })
    //Find user ref
    let uid = UserService.userInfo.uid
    let ref = ''
    Firebase.database().ref('users')
      .orderByChild('uid')
      .equalTo(uid)
      .once("value", (snapshot) => {
        var datas = [];
        snapshot.forEach(function (child) {
          ref = 'users/' + child.key
          console.log('ref', ref, child)
        })
        if (this.state.isSelectedImage)
          this.updateAvaterAndUserName(ref)
        else this.updateUserName(ref)
      })
  }

  render() {
    let avatar = this.state.image ? { uri: this.state.image } : Images.defaultAvatar

    return (
      <View style={styles.container}>
        <Header onLeftPress={this.goBack} isShowRight={true} onRightPress={this.onUpdateUserInfo} />
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={this.showImagePicker}>
            <Image style={styles.avatar} source={avatar} />
          </TouchableOpacity>
        </View>
        <View style={styles.textInput}>
          <ImageTextInput
            value={this.state.userName}
            image={Images.userName}
            hintText='Họ tên'
            onValueChange={this.onUserTextChange} />
        </View>
        <Loading show={this.state.loading} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
