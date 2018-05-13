import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import { CachedImage } from 'react-native-cached-image';
import styles from './Styles/HomeItemStyle'

export default class HomeItem extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render() {
    if (!this.props.data)
      return null

    const imageUrl = this.props.data.image
    const title = this.props.data.foodName

    return (
      <View style={styles.container}>
        <CachedImage style={styles.imageContainer} source={{ uri: imageUrl }} />
        <Text style={styles.title}>{title}</Text>
      </View>
    )
  }
}
