import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/HeaderStyle'
import { Images } from '../Themes';

export default class Header extends Component {
  // Prop type warnings
  static propTypes = {
    isShowRight: PropTypes.bool,
    title: PropTypes.string,
    onLeftPress: PropTypes.func,
    onRightPress: PropTypes.func,
  }

  // Defaults for props
  static defaultProps = {
    isShowRight: false,
    title: '',
    onLeftPress: null,
    onRightPress: null
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
        {
          this.props.isShowRight ?
            <TouchableOpacity style={styles.rightContainer} onPress={() => this.props.onRightPress()}>
              <Text style={styles.rightText}>Lưu</Text>
            </TouchableOpacity>
            : <View style={styles.rightContainer} />
        }

      </View>
    )
  }
}
