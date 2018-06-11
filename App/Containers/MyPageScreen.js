import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, AsyncStorage, View, Image, Alert } from 'react-native'
import UserService from '../Config/UserService'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MyPageScreenStyle'
import { Images } from '../Themes';

class MyPageScreen extends Component {
  constructor(props) {
    super(props)

    this.state = { userData: UserService.userInfo }

    this.logout = this.logout.bind(this)
    this.onEditProfilePress = this.onEditProfilePress.bind(this)
    this.onChangePasswordPress = this.onChangePasswordPress.bind(this)
  }

  onEditProfilePress() {
    this.props.navigation.navigate('EditProfileScreen')
  }

  onChangePasswordPress() {
    this.props.navigation.navigate('ChangePasswordScreen')
  }

  logout() {
    Alert.alert(
      'Bạn có muốn đăng xuất không?',
      '',
      [
        { text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Có', onPress: () => {
            console.log('OK Pressed')
            AsyncStorage.setItem('userData', '')
            this.props.navigation.navigate('LoginScreen')
          }
        },
      ],
      { cancelable: false }
    )
  }

  render() {
    let avatar = (this.state.userData && this.state.userData.avatar) ? { uri: this.state.userData.avatar } : Images.defaultAvatar
    let userName = this.state.userData ? this.state.userData.userName : ''

    return (
      <ScrollView style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Image style={styles.avatar} source={avatar} />
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity style={styles.itemContainer} onPress={this.onEditProfilePress}>
          <Text style={styles.itemText}>Chỉnh sửa thông tin cá nhân</Text>
          <Image style={styles.itemArrowRight} source={Images.icArrowRight} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer} onPress={this.onChangePasswordPress}>
          <Text style={styles.itemText}>Thay đổi mật khẩu</Text>
          <Image style={styles.itemArrowRight} source={Images.icArrowRight} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer} onPress={this.logout}>
          <Text style={styles.itemText}>Đăng xuất</Text>
          <Image style={styles.itemArrowRight} source={Images.icArrowRight} />
        </TouchableOpacity>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyPageScreen)
