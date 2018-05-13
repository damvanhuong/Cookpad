import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Firebase from '../Config/Firebase'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeScreenStyle'
import { Images } from '../Themes';

class HomeScreen extends Component {

  constructor(props) {
    super(props)

    this.handleOpenCreatePostScreen = this.handleOpenCreatePostScreen.bind(this)
  }

  componentDidMount() {
    Firebase.database().ref('foody').set({
      email: 'hantanabka@gmail.com'
    }).then(() => {
      console.log('INSERTED !')
    }).catch(error => { console.log(error) })
  }

  handleOpenCreatePostScreen() {
    this.props.navigation.navigate('CreatePostScreen')
  }

  renderAddButton() {
    return (
      <TouchableOpacity style={styles.buttonAddContainer} onPress={this.handleOpenCreatePostScreen}>
        <Image style={styles.buttonAdd} source={Images.icAdd} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderAddButton()}
        <Text>HomeScreen</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
