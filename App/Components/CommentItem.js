import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import { Images } from '../Themes';
import styles from './Styles/CommentItemStyle'

export default class CommentItem extends Component {
  // Prop type warnings
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  // Defaults for props
  static defaultProps = {
    data: {}
  }

  render() {
    let avatar = this.props.data.avatar ? { uri: this.props.data.avatar } : Images.defaultAvatar
    let userName = this.props.data.userName || ''
    let comment = this.props.data.comment || ''
    let date = this.props.data.date || ''

    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={avatar} />
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.comment}>{comment}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    )
  }
}
