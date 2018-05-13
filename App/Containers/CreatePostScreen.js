import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Metrics, Images } from '../Themes'
import DotIndicator from '../Components/DotIndicator'
import BaseInfoPageScreen from './BaseInfoPageScreen'
import MaterialPageScreen from './MaterialPageScreen'
import TutorialPageScreen from './TutorialPageScreen'
import FirebaseController from '../Lib/FirebaseController'
import Firebase from '../Config/Firebase'
import { IndicatorViewPager } from 'rn-viewpager';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CreatePostScreenStyle'

class CreatePostScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pageSelected: 0,
      leftTitle: 'VỀ TRƯỚC',
      rightTitle: 'TIẾP THEO',
      isFinished: false,
    }

    this.onPageSelected = this.onPageSelected.bind(this)
    this.handleLeftTitlePress = this.handleLeftTitlePress.bind(this)
    this.handleRightTitlePress = this.handleRightTitlePress.bind(this)
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
        // this.props.navigation.goBack()
        else
          Alert.alert('Vui lòng nhập đủ thông tin!', this.refs.tutorialPage.getError())
        break
      default: break
    }
  }

  handlePushData() {
    console.log('handlePushData', this.refs)

    let baseInfoData = this.refs.baseInfoPage.getValue()
    let materialData = this.refs.materialPage.getValue()
    let tutorialData = this.refs.tutorialPage.getValue()

    let foodData = { ...baseInfoData, ...materialData, ...tutorialData }

    console.log('foodData', foodData)

    //Upload image
    FirebaseController.uploadImage(foodData.image, 'image/jpeg').then(url => {
      foodData.image = url
      // upload database
      Firebase.database().ref('foody').push({
        ...foodData
      }).then(() => {
        console.log('INSERTED !')
      }).catch(error => { console.log(error) })
    })
      .catch(error => console.log(error))
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
            <BaseInfoPageScreen ref='baseInfoPage' />
          </View>
          <View>
            <MaterialPageScreen ref='materialPage' />
          </View>
          <View>
            <TutorialPageScreen ref='tutorialPage' />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostScreen)
