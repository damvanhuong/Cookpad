import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import { connect } from 'react-redux'
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import { CachedImage } from 'react-native-cached-image';
import Timeline from 'react-native-timeline-listview'
import CommentPageScreen from './CommentPageScreen'
import RatingPageScreen from './RatingPageScreen'
import UserService from '../Config/UserService'
import Firebase from '../Config/Firebase'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PostDetailScreenStyle'
import { Metrics, Images, Colors } from '../Themes';

class PostDetailScreen extends Component {

  constructor(props) {
    super(props)

    const mData = props.navigation.getParam('data', {})
    this.state = { key: mData.key, data: mData.data, tutorials: this.getTutorials(mData.data) }

    this.goBack = this.goBack.bind(this)
    this.onPressDeleteButton = this.onPressDeleteButton.bind(this)
    this.onPressEditButton = this.onPressEditButton.bind(this)
    this.renderMaterialItem = this.renderMaterialItem.bind(this)
    this.renderTutorialItem = this.renderTutorialItem.bind(this)
  }

  goBack() {
    this.props.navigation.goBack()
  }

  getTutorials(data) {
    let listTutorial = []
    for (let i = 0; i < data.tutorials.length; i++) {
      listTutorial.push({ time: i + 1, text: data.tutorials[i] })
    }
    return listTutorial
  }

  onPressDeleteButton() {
    Alert.alert(
      'Bạn có muốn xóa bài đăng này không?',
      '',
      [
        { text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Có', onPress: () => {
            console.log('OK Pressed')
            Firebase.database().ref('feedy/' + this.state.key).remove().then(() => {
              console.log('Delete Ok')
              this.goBack()
            }).catch((error) => {
              console.log(error)
            })
          }
        },
      ],
      { cancelable: false }
    )
  }

  onPressEditButton() {

  }

  renderImageHeader() {
    let title = this.state.data.foodName || ''
    let uid = this.state.data.uid

    return (
      <CachedImage
        style={styles.headerContainer} source={{ uri: this.state.data.image }}>
        <TouchableOpacity style={styles.backButtonContainer} onPress={this.goBack}>
          <Image style={styles.backButton} source={Images.icBack} />
        </TouchableOpacity>
        {UserService.userInfo.uid === uid ?
          <TouchableOpacity style={styles.editButtonContainer} onPress={this.onPressEditButton}>
            <Image style={styles.baseImage} source={Images.icEdit} />
          </TouchableOpacity> : null
        }
        {UserService.userInfo.uid === uid ?
          <TouchableOpacity style={styles.deleteButtonContainer} onPress={this.onPressDeleteButton}>
            <Image style={styles.baseImage} source={Images.icDelete} />
          </TouchableOpacity> : null
        }
        <View style={styles.postTitleContainer}>
          <Text style={styles.postTitle}>{title}</Text>
          {UserService.userInfo.uid !== uid ?
            <TouchableOpacity >
              <Image style={styles.cartImage} source={Images.tabbarShopping} />
            </TouchableOpacity> : null
          }
        </View>
      </CachedImage>
    )
  }

  renderTitleIndicator() {
    return (
      <PagerTitleIndicator
        style={styles.indicatorContainer}
        trackScroll={true}
        itemTextStyle={styles.indicatorText}
        itemStyle={{ width: Metrics.screenWidth / 4 }}
        selectedItemStyle={{ width: Metrics.screenWidth / 4 }}
        selectedItemTextStyle={styles.indicatorSelectedText}
        selectedBorderStyle={styles.selectedBorderStyle}
        titles={['Nguyên liệu', 'Thực hiện', 'Bình luận', 'Đánh giá']}
      />
    )
  }

  renderMaterialItem({ item, index }) {

    console.log('renderMaterialItem', item, index)
    var style = (index % 2 === 0) ? styles.materialItemContainer
      : [styles.materialItemContainer, { backgroundColor: Colors.listBg }]

    return (
      <View style={style}>
        <Text>{item}</Text>
      </View>
    )
  }

  renderMaterialPage() {
    console.log('renderMaterialPage', this.state.data.rawMaterials)
    return (
      <FlatList
        data={this.state.data.rawMaterials}
        renderItem={this.renderMaterialItem} />
    )
  }

  renderTutorialItem(rowData, sectionID, rowID) {
    return (
      <View style={styles.tutorialItemContainer}>
        <Text>{rowData.text}</Text>
      </View>
    )
  }

  renderTutorialPage() {
    return (
      <Timeline
        data={this.state.tutorials}
        circleSize={20}
        style={styles.timeLineContainer}
        innerCircle={'dot'}
        timeContainerStyle={{}}
        timeStyle={styles.timeStyle}
        circleColor='rgb(45,156,219)'
        lineColor='rgb(45,156,219)'
        renderDetail={this.renderTutorialItem} />
    )

  }

  render() {

    return (
      <View style={styles.container}>
        {this.renderImageHeader()}
        <IndicatorViewPager
          style={{ flex: 1, flexDirection: 'column-reverse' }}
          indicator={this.renderTitleIndicator()}
        >
          <View>
            {this.renderMaterialPage()}
          </View>
          <View>
            {this.renderTutorialPage()}
          </View>
          <CommentPageScreen data={this.state.data} postKey={this.state.key} />
          <RatingPageScreen data={this.state.data} postKey={this.state.key} />
        </IndicatorViewPager>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailScreen)
