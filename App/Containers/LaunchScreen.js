import React, { Component } from 'react'
import { View, Image, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LaunchScreenStyle'
import { Images } from '../Themes';

class LaunchScreen extends Component {

  componentDidMount() {
    this.checkLoginStatus()
  }

  checkLoginStatus() {
    AsyncStorage.getItem('userData').then((value) => {
      console.log('userData', value)
      // logined in
      if (value)
        this.props.navigation.navigate('TabBarScreen')
      else this.props.navigation.navigate('LoginScreen')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={Images.homeHeader} />
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

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
