import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator } from 'react-native'
import { Colors, Metrics } from '../Themes'

import styles from './Styles/LoadingStyle'

export default class Loading extends Component {
  // Prop type warnings
  static propTypes = {
    show: PropTypes.bool,
    color: PropTypes.string,
    backgroundColor: PropTypes.string
  }

  // Defaults for props
  static defaultProps = {
    show: false,
    color: 'white',
    backgroundColor: Colors.windowTint
  }

  render() {
    if (this.props.show)
      return (
        <View style={[styles.container, { backgroundColor: this.props.backgroundColor }]}>
          {/* <View style={styles.indicatorHolder}> */}
          <ActivityIndicator animating={true} size="large" color={this.props.color} />
          {/* </View> */}
        </View>
      )
    else return null
  }
}
