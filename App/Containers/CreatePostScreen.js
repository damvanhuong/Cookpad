import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import { Metrics, Images, Colors } from '../Themes'
import DotIndicator from '../Components/DotIndicator'
import BaseInfoPageScreen from './BaseInfoPageScreen'
import MaterialPageScreen from './MaterialPageScreen'
import TutorialPageScreen from './TutorialPageScreen'
import FirebaseController from '../Lib/FirebaseController'
import Firebase from '../Config/Firebase'
import { IndicatorViewPager } from 'rn-viewpager';
import Constants from '../Config/Constants'
import Analytics from '../Lib/Analytics'
import Loading from '../Components/Loading'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CreatePostScreenStyle'
import UserService from '../Config/UserService';

export default class CreatePostScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isEdit: props.navigation.getParam('isEdit', false),
      data: props.navigation.getParam('data', {}),
      postKey: props.navigation.getParam('postKey', ''),
      pageSelected: 0,
      leftTitle: 'VỀ TRƯỚC',
      rightTitle: 'TIẾP THEO',
      isFinished: false,
      loading: false
    }

    this.onPageSelected = this.onPageSelected.bind(this)
    this.handleLeftTitlePress = this.handleLeftTitlePress.bind(this)
    this.handleRightTitlePress = this.handleRightTitlePress.bind(this)
  }

  componentDidMount() {
    Analytics.trackingScreen(Constants.screenName.createPost)
  }

  onPageSelected(page) {
    console.log(page)
    if (page.position < 2)
      this.setState({ pageSelected: page.position, rightTitle: 'TIẾP THEO', isFinished: false })
    else
      this.setState({ pageSelected: page.position, rightTitle: 'HOÀN TẤT', isFinished: true })

  }

  handleLeftTitlePress() {
    console.log('handleLeftTitlePress')
    if (this.state.pageSelected === 0)
      this.props.navigation.goBack()
    else if (this.state.pageSelected > 0)
      this.refs.viewPager.setPage(this.state.pageSelected - 1)
  }

  handleRightTitlePress() {
    console.log('handleRightTitlePress', this.state.pageSelected)
    switch (this.state.pageSelected) {
      case 0:
        if (this.refs.baseInfoPage.getError() === '')
          this.refs.viewPager.setPage(this.state.pageSelected + 1)
        else
          Alert.alert('Vui lòng nhập đủ thông tin!', this.refs.baseInfoPage.getError())
        break
      case 1:
        if (this.refs.materialPage.getError() === '') {
          this.refs.viewPager.setPage(this.state.pageSelected + 1)
        }
        else
          Alert.alert('Vui lòng nhập đủ thông tin!', this.refs.materialPage.getError())
        break
      case 2:
        if (this.refs.tutorialPage.getError() === '')
          this.handlePushData()
        else
          Alert.alert('Vui lòng nhập đủ thông tin!', this.refs.tutorialPage.getError())
        break
      default: break
    }
  }

  updatePost(foodData) {
    if (this.refs.baseInfoPage.isPickedImage()) {
      //Upload image
      FirebaseController.uploadImage(foodData.image, 'image/jpeg').then(url => {
        foodData.image = url
        // update database
        Firebase.database().ref('feedy/' + this.state.postKey).update({
          ...foodData
        }).then(() => {
          this.setState({ loading: false })
          this.props.navigation.goBack()
          Analytics.logEvent(Constants.eventName.update_post_success, {})
          console.log('UPDATED WITH IMAGE!')
        }).catch(error => { console.log(error) })
      })
        .catch(error => console.log(error))
    }
    else {
      // update database
      Firebase.database().ref('feedy/' + this.state.postKey).update({
        ...foodData
      }).then(() => {
        this.setState({ loading: false })
        this.props.navigation.goBack()
        Analytics.logEvent(Constants.eventName.update_post_success, {})
        console.log('UPDATED WITHOUT IMAGE!')
      }).catch(error => { console.log(error) })
    }
  }

  handlePushData() {
    this.setState({ loading: true })
    // console.log('handlePushData', this.refs)

    let baseInfoData = this.refs.baseInfoPage.getValue()
    let materialData = this.refs.materialPage.getValue()
    let tutorialData = this.refs.tutorialPage.getValue()

    let foodData = { ...baseInfoData, ...materialData, ...tutorialData }
    foodData.uid = UserService.userInfo.uid
    foodData.ratings = []
    foodData.comment = []
    console.log('foodData', foodData)

    if (this.state.isEdit) {
      this.updatePost(foodData)
    }
    else {
      //Upload image
      FirebaseController.uploadImage(foodData.image, 'image/jpeg').then(url => {
        foodData.image = url
        // upload database
        Firebase.database().ref('feedy').push({
          ...foodData
        }).then(() => {
          this.setState({ loading: false })
          this.props.navigation.goBack()
          Analytics.logEvent(Constants.eventName.create_post_success, {})
          console.log('INSERTED !')
        }).catch(error => { console.log(error) })
      })
        .catch(error => console.log(error))
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <IndicatorViewPager
          ref='viewPager'
          style={{ height: Metrics.screenHeight - Metrics.dotIndicatorHeight }}
          horizontalScroll={false}
          onPageSelected={this.onPageSelected}
        >
          <View>
            {this.state.isEdit ?
              <BaseInfoPageScreen ref='baseInfoPage' isEdit={true} data={this.state.data} />
              : <BaseInfoPageScreen ref='baseInfoPage' />}
          </View>
          <View>
            {this.state.isEdit ?
              <MaterialPageScreen ref='materialPage' isEdit={true} data={this.state.data} />
              : <MaterialPageScreen ref='materialPage' />}
          </View>
          <View>
            {this.state.isEdit ?
              <TutorialPageScreen ref='tutorialPage' isEdit={true} data={this.state.data} />
              : <TutorialPageScreen ref='tutorialPage' />}
          </View>
        </IndicatorViewPager>
        <DotIndicator
          isFinished={this.state.isFinished}
          activeIndex={this.state.pageSelected}
          leftTitle={this.state.leftTitle}
          onLeftTitlePress={this.handleLeftTitlePress}
          rightTitle={this.state.rightTitle}
          onRightTitlePress={this.handleRightTitlePress}
        />
        <Loading show={this.state.loading} color={Colors.main} backgroundColor={Colors.transparent} />
      </View>
    )
  }
}
