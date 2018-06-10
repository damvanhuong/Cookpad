import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import styles from './Styles/MaterialItemStyle'
import { Images } from '../Themes';

export default class MaterialItem extends Component {
  // Prop type warnings
  static propTypes = {
    index: PropTypes.number,
    onPressRemove: PropTypes.func,
    isEdit: PropTypes.bool,
    data: PropTypes.object
  }

  // Defaults for props
  static defaultProps = {
    number: 0,
    onPressRemove: null,
    isEdit: false,
    data: null
  }

  constructor(props) {
    super(props)

    this.state = { text: props.isEdit ? props.data : '' }

    this.onChangeText = this.onChangeText.bind(this)
    this.getText = this.getText.bind(this)
  }

  onChangeText(text) {
    this.setState({ text: text })
  }

  getText() {
    return this.state.text
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          value={this.state.text}
          placeholder='Nguyên liệu'
          underlineColorAndroid='transparent'
          onChangeText={this.onChangeText} />
        <TouchableOpacity onPress={() => this.props.onPressRemove(this.props.index)}>
          <Image style={styles.image} source={Images.icRemove} />
        </TouchableOpacity>
      </View>
    )
  }
}
