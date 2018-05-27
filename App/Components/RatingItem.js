import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import StarRating from 'react-native-star-rating';
import styles from './Styles/RatingItemStyle'

export default class RatingItem extends Component {
  // Prop type warnings
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  // Defaults for props
  static defaultProps = {
    data: {}
  }

  render() {
    let avatar = this.props.data.avatar || ''
    let userName = this.props.data.userName || ''
    let ratingCount = this.props.data.ratingCount || 0
    let comment = this.props.data.comment || ''
    let date = this.props.data.date || ''

    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: avatar }} />
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <StarRating
            containerStyle={{ width: 130 }}
            disabled={true}
            maxStars={5}
            starSize={25}
            starStyle={styles.star}
            rating={ratingCount}
          />
          <Text style={styles.comment}>{comment}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    )
  }
}
