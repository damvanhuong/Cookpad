import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { Rating } from 'react-native-ratings';
import Modal from "react-native-modal";
import RatingItem from '../Components/RatingItem'
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RatingPageScreenStyle'
import { Images } from '../Themes';

class RatingPageScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [
        { userName: 'huongdv', avatar: 'http://www.wallpaperbetter.com/wallpaper/598/77/84/korean-beautiful-girl-1080P-wallpaper-middle-size.jpg', ratingCount: 2, comment: 'Good', date: '27-05-2018' },
        { userName: 'thuypn', avatar: 'http://www.wallpaperbetter.com/wallpaper/598/77/84/korean-beautiful-girl-1080P-wallpaper-middle-size.jpg', ratingCount: 2, comment: 'Good', date: '27-05-2018' }
      ],
      showModal: false,
      ratingCount: 0,
    }

    this.renderItem = this.renderItem.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.onStarRatingPress = this.onStarRatingPress.bind(this)
  }

  onStarRatingPress(rating) {
    this.setState({ ratingCount: rating });
  }

  showModal() {
    this.setState({ showModal: true })
  }

  hideModal() {
    this.setState({ showModal: false })
  }

  renderItem({ item, index }) {
    return (
      <RatingItem key={index} data={item} />
    )
  }

  renderModal() {
    return (
      <Modal
        isVisible={this.state.showModal}
        onBackdropPress={this.hideModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Đánh giá</Text>
          <View style={styles.modalContent}>
            <StarRating
              containerStyle={{ width: 150 }}
              maxStars={5}
              starSize={25}
              starStyle={styles.modalStar}
              rating={this.state.ratingCount}
              selectedStar={this.onStarRatingPress}
            />
            <TextInput style={styles.textInput}
              multiline={true}
              textAlignVertical='top'
              placeholder='Nhập đánh giá của bạn'
              underlineColorAndroid='transparent'
            />
            <TouchableOpacity style={styles.sendButtonContainer}>
              <Text style={styles.sendButton}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  renderFooter() {
    return (
      <TouchableOpacity style={styles.ratingContainer} onPress={this.showModal}>
        <Image style={styles.ratingImage} source={Images.icRating} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={this.state.data}
          renderItem={this.renderItem} />
        {this.renderFooter()}
        {this.renderModal()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingPageScreen)
