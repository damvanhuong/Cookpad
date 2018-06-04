import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import Header from '../Components/Header'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditProfileScreenStyle'

class EditProfileScreen extends Component {

  constructor(props) {
    super(props)

    this.goBack = this.goBack.bind(this)
  }

  goBack() {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <Header onLeftPress={this.goBack} />
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
