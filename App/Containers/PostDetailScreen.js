import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, Alert, AsyncStorage } from 'react-native'
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import { CachedImage } from 'react-native-cached-image';
import Timeline from 'react-native-timeline-listview'
import CommentPageScreen from './CommentPageScreen'
import RatingPageScreen from './RatingPageScreen'
import UserService from '../Config/UserService'
import Firebase from '../Config/Firebase'
import Constants from '../Config/Constants'
import Analytics from '../Lib/Analytics'
import Loading from '../Components/Loading'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PostDetailScreenStyle'
import { Metrics, Images, Colors } from '../Themes';

export default class PostDetailScreen extends Component {

  constructor(props) {
    super(props)

    const mData = props.navigation.getParam('data', {})
    this.state = {
      loading: false,
      key: mData.key,
      data: mData.data,
      tutorials: this.getTutorials(mData.data),
      ref: this.props.navigation.getParam('ref', 'feedy')
    }

    this.goBack = this.goBack.bind(this)
    this.onPressDeleteButton = this.onPressDeleteButton.bind(this)
    this.onPressEditButton = this.onPressEditButton.bind(this)
    this.onPressShopping = this.onPressShopping.bind(this)
    this.renderMaterialItem = this.renderMaterialItem.bind(this)
    this.renderTutorialItem = this.renderTutorialItem.bind(this)
  }

  componentDidMount() {
    Analytics.trackingScreen(Constants.screenName.postDetail)
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

  onPressShopping() {
    this.setState({ loading: true })
    let uid = UserService.userInfo.uid
    let ref = ''
    let isAdded = false
    let listShopping = (UserService.userInfo && UserService.userInfo.listShopping !== undefined) ? UserService.userInfo.listShopping : []
    for (let i = 0; i < listShopping.length; i++) {
      if (listShopping[i].key === this.state.key) {
        isAdded = true
        break
      }
    }
    if (isAdded) {
      alert('Bạn đã thêm vào danh sách mua sắm rồi')
      setTimeout(() => this.setState({ loading: false }), 500)
      return
    }
    //Find user ref
    Firebase.database().ref('users')
      .orderByChild('uid')
      .equalTo(uid)
      .once("value", (snapshot) => {
        var datas = [];
        snapshot.forEach(function (child) {
          ref = 'users/' + child.key
          console.log('ref', ref, child)
        })
        listShopping.push({ key: this.state.key, ref: this.state.ref })
        // update user info
        Firebase.database().ref(ref).update({
          listShopping: listShopping
        }).then(() => {
          this.setState({ loading: false })
          UserService.userInfo.listShopping = listShopping
          AsyncStorage.setItem('userData', JSON.stringify(UserService.userInfo))
          console.log('Add to list shopping successfully !')
        }).catch(error => {
          this.setState({ loading: false })
          console.log(error)
        })
      })
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
    this.props.navigation.navigate('CreatePostScreen', { data: this.state.data, isEdit: true, postKey: this.state.key })
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
            <TouchableOpacity onPress={this.onPressShopping}>
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
          <CommentPageScreen data={this.state.data} postKey={this.state.key} postRef={this.state.ref} />
          <RatingPageScreen data={this.state.data} postKey={this.state.key} postRef={this.state.ref} />
        </IndicatorViewPager>
        <Loading show={this.state.loading} color={Colors.main} backgroundColor={Colors.transparent} />
      </View>
    )
  }
}

