import React, { Component } from 'react'
import { ScrollView, Text, View, TextInput, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import ImagePickerController from '../Lib/ImagePickerController'
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BaseInfoPageScreenStyle'
import { Images } from '../Themes';

export default class BaseInfoPageScreen extends Component {

  constructor(props) {
    super(props)

    this.showImagePicker = this.showImagePicker.bind(this)
    this.onChangeNameText = this.onChangeNameText.bind(this)
    this.onChangeDesText = this.onChangeDesText.bind(this)
    this.showTimePicker = this.showTimePicker.bind(this)
    this.hideTimePicker = this.hideTimePicker.bind(this)
    this.handleTimePicked = this.handleTimePicked.bind(this)

    this.state = {
      image: props.isEdit ? props.data.image : null,
      foodName: props.isEdit ? props.data.foodName : '',
      foodDes: props.isEdit ? props.data.foodDes : '',
      timeText: props.isEdit ? props.data.timeText : '00h:00ph',
      isDateTimePickerVisible: false,
      isPickedImage: false
    }
  }

  getValue() {
    var baseInfo = {
      image: this.state.image,
      foodName: this.state.foodName,
      foodDes: this.state.foodDes,
      timeText: this.state.timeText
    }
    return baseInfo
  }

  isPickedImage() {
    return this.state.isPickedImage
  }

  getError() {
    var error = ''

    if (!this.state.image)
      error = 'Chưa chọn ảnh'
    else if (this.state.foodName.trim() === '')
      error = 'Chưa nhập tên công thức'
    else if (this.state.foodDes.trim() === '')
      error = 'Chưa nhập miêu tả về công thức'

    return error
  }

  showImagePicker() {
    ImagePickerController.showImagePicker().then(uri => {
      this.setState({ image: uri, isPickedImage: true })
    })
  }

  showTimePicker() {
    this.setState({ isDateTimePickerVisible: true })
  }

  hideTimePicker(time = null) {
    if (time)
      this.setState({ isDateTimePickerVisible: false, timeText: time })
    else this.setState({ isDateTimePickerVisible: false })
  }

  handleTimePicked(date) {
    console.log('handleTimePicked: ', date)
    var time = moment(date).format('hh[h] mm[ph]')
    this.hideTimePicker(time);
  }

  onChangeNameText(text) {
    this.setState({ foodName: text })
  }
  onChangeDesText(text) {
    this.setState({ foodDes: text })
  }

  renderImageContainer() {
    if (this.state.image) {
      return (
        <ImageBackground style={styles.imageContainer} source={{ uri: this.state.image }}>
          <View style={styles.pickerContainer}>
            <TouchableOpacity onPress={this.showImagePicker}>
              <Image style={styles.icCamera} source={Images.icCamera} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )
    }
    else {
      return (
        <View style={styles.imageContainer}>
          <Image style={styles.imageBg} source={Images.bgFood} />
          <View style={styles.pickerContainer}>
            <TouchableOpacity onPress={this.showImagePicker}>
              <Image style={styles.icCamera} source={Images.icCamera} />
            </TouchableOpacity>
          </View>
        </View>
      )
    }

  }

  render() {

    return (
      <ScrollView style={styles.container}>
        {this.renderImageContainer()}
        <TextInput style={styles.textInput}
          value={this.state.foodName}
          placeholder='Tên món ăn'
          underlineColorAndroid='transparent'
          onChangeText={this.onChangeNameText} />
        <View style={styles.line}></View>
        <TextInput style={[styles.textInput, { height: 100 }]}
          value={this.state.foodDes}
          multiline={true}
          textAlignVertical='top'
          placeholder='Mô tả ngắn gọn về món ăn'
          underlineColorAndroid='transparent'
          onChangeText={this.onChangeDesText} />
        <Text style={styles.title}>THỜI GIAN THỰC HIỆN</Text>
        <View style={styles.timePickerContainer}>
          <Text style={styles.timeTitle}>Thời gian</Text>
          <TouchableOpacity onPress={this.showTimePicker}>
            <Text style={styles.timeText}>{this.state.timeText}</Text>
          </TouchableOpacity>
        </View>
        <DateTimePicker
          mode='time'
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleTimePicked}
          onCancel={this.hideTimePicker}
        />
      </ScrollView >
    )
  }
}

