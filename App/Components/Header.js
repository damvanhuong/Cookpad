import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/HeaderStyle'
import { Images } from '../Themes';

export default class Header extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
    onLeftPress: PropTypes.func
  }

  // Defaults for props
  static defaultProps = {
    title: '',
    onLeftPress: null
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftContainer} onPress={() => this.props.onLeftPress()}>
          <Image style={styles.leftImage} source={Images.icBack} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>{this.props.title}</Text>
        </View>
        <View style={styles.rightContainer} />
      </View>
    )
  }
}
