import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator } from 'react-native'

import styles from './Styles/LoadingStyle'

export default class Loading extends Component {
  // Prop type warnings
  static propTypes = {
    show: PropTypes.bool
  }

  // Defaults for props
  static defaultProps = {
    show: false
  }

  render() {
    if (this.props.show)
      return (
        <View style={styles.container}>
          {/* <View style={styles.indicatorHolder}> */}
            <ActivityIndicator animating={true} size="large" color='white'/>
          {/* </View> */}
        </View>
      )
    else return null
  }
}
