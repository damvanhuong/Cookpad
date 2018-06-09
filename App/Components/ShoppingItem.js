import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import { Images } from '../Themes';
import styles from './Styles/ShoppingItemStyle'

export default class ShoppingItem extends Component {
  // Prop type warnings
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  // Defaults for props
  static defaultProps = {
    data: {}
  }

  render() {
    let image = this.props.data.image
    let foodName = this.props.data.foodName || ''

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.foodInfoContainer}>
          <Text style={styles.foodName}>{foodName}</Text>
        </View>
      </View>
    )
  }
}
