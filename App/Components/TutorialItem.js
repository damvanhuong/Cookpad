import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import styles from './Styles/TutorialItemStyle'
import { Images } from '../Themes';

export default class TutorialItem extends Component {
  // Prop type warnings
  static propTypes = {
    index: PropTypes.number,
    onPressRemove: PropTypes.func,
  }

  // Defaults for props
  static defaultProps = {
    number: 0,
    onPressRemove: null
  }

  constructor(props) {
    super(props)

    this.state = { text: '' }

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
          multiline={true}
          textAlignVertical='top'
          placeholder='Nhập hướng dẫn cách làm'
          underlineColorAndroid='transparent'
          onChangeText={this.onChangeText} />
        <TouchableOpacity onPress={() => this.props.onPressRemove(this.props.index)}>
          <Image style={styles.image} source={Images.icRemove} />
        </TouchableOpacity>
      </View>
    )
  }
}
