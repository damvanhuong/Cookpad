import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Image, TextInput } from 'react-native'
import styles from './Styles/ImageTextInputStyle'

export default class ImageTextInput extends Component {
  // Prop type warnings
  static propTypes = {
    value: PropTypes.string,
    image: PropTypes.number,
    hintText: PropTypes.string,
    onValueChange: PropTypes.func,
    secureTextEntry: PropTypes.bool
  }

  // Defaults for props
  static defaultProps = {
    value: '',
    image: null,
    hintText: '',
    onValueChange: null,
    secureTextEntry: false
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={this.props.image} resizeMode="contain" />
        </View>
        <View style={styles.textInputContainer}>
          {this.props.secureTextEntry ?
            <TextInput style={styles.textInput}
              value={this.props.value}
              secureTextEntry
              placeholder={this.props.hintText}
              underlineColorAndroid='transparent'
              onChangeText={this.props.onValueChange} />
            : <TextInput style={styles.textInput}
              value={this.props.value}
              placeholder={this.props.hintText}
              underlineColorAndroid='transparent'
              onChangeText={this.props.onValueChange} />}

        </View>
      </View>
    )
  }
}
