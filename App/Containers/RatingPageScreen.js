import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { Rating } from 'react-native-ratings';
import Modal from "react-native-modal";
import RatingItem from '../Components/RatingItem'
import StarRating from 'react-native-star-rating';
import UserService from '../Config/UserService'
import Firebase from '../Config/Firebase'
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
      data: this.props.data.ratings ? this.props.data.ratings : [],
      showModal: false,
      ratingCount: 0,
      comment: ''
    }

    this.renderItem = this.renderItem.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.onStarRatingPress = this.onStarRatingPress.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.onPressSendButton = this.onPressSendButton.bind(this)
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

  onChangeText(text) {
    this.setState({ comment: text })
  }

  onPressSendButton() {
    var postData = this.props.data
    var listRating = (postData && postData.ratings !== undefined) ? postData.ratings : []
    var rating = {}
    rating.userName = UserService.userInfo.userName
    rating.ratingCount = this.state.ratingCount
    rating.comment = this.state.comment
    rating.date = new Date().toJSON().slice(0, 10)
    if (UserService.userInfo.avatar)
      rating.avatar = UserService.userInfo.avatar
    listRating.push(rating)
    console.log(this.props.postKey, listRating)
    var ref = 'feedy/' + this.props.postKey
    var postRef = Firebase.database().ref(ref)
    postRef.update({ ratings: listRating }).then(() => {
      console.log(' Rating OK')
      this.setState({ showModal: false })
    }).catch((error) => {
      console.log(error)
      this.setState({ showModal: false })
    })
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
              onChangeText={this.onChangeText}
            />
            <TouchableOpacity style={styles.sendButtonContainer} onPress={this.onPressSendButton}>
              <Text style={styles.sendButton}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  renderFooter() {
    if (UserService.userInfo.uid !== this.props.data.uid) {
      return (
        <TouchableOpacity style={styles.ratingContainer} onPress={this.showModal}>
          <Image style={styles.ratingImage} source={Images.icRating} />
        </TouchableOpacity>
      )
    }
    else return null
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
