import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { Rating } from 'react-native-ratings';
import Modal from "react-native-modal";
import CommentItem from '../Components/CommentItem'
import StarRating from 'react-native-star-rating';
import UserService from '../Config/UserService'
import Firebase from '../Config/Firebase'
import Constants from '../Config/Constants'
import Analytics from '../Lib/Analytics'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CommentPageScreenStyle'
import { Images } from '../Themes';

export default class CommentPageScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data.comments ? this.props.data.comments : [],
      showModal: false,
      comment: ''
    }

    this.renderItem = this.renderItem.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.onPressSendButton = this.onPressSendButton.bind(this)
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
    var listComments = (postData && postData.comments !== undefined) ? postData.comments : []
    var comment = {}
    comment.userName = UserService.userInfo.userName
    comment.comment = this.state.comment
    comment.date = new Date().toJSON().slice(0, 10)
    if (UserService.userInfo.avatar)
      comment.avatar = UserService.userInfo.avatar
    listComments.push(comment)
    var ref = this.props.postRef + this.props.postKey
    var postRef = Firebase.database().ref(ref)
    postRef.update({ comments: listComments }).then(() => {
      console.log(' Comment OK')
      Analytics.logEvent(Constants.eventName.comment_success, {})
      this.setState({ showModal: false })
    }).catch((error) => {
      console.log(error)
      this.setState({ showModal: false })
    })

  }

  renderItem({ item, index }) {
    return (
      <CommentItem key={index} data={item} />
    )
  }

  renderModal() {
    return (
      <Modal
        isVisible={this.state.showModal}
        onBackdropPress={this.hideModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Bình luận</Text>
          <View style={styles.modalContent}>
            <TextInput style={styles.textInput}
              multiline={true}
              textAlignVertical='top'
              placeholder='Nhập bình luận của bạn'
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
    // if (UserService.userInfo.uid !== this.props.data.uid) {
      return (
        <TouchableOpacity style={styles.ratingContainer} onPress={this.showModal}>
          <Image style={styles.ratingImage} source={Images.icComment} />
        </TouchableOpacity>
      )
    // }
    // else return null
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

