import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import Firebase from '../Config/Firebase'
import HomeItem from '../Components/HomeItem'
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import { CachedImage } from 'react-native-cached-image';
import Constants from '../Config/Constants'
import Analytics from '../Lib/Analytics'
import Loading from '../Components/Loading'
import { Colors } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeScreenStyle'
import { Images } from '../Themes';

export default class HomeScreen extends Component {

  constructor(props) {
    super(props)

    this.state = { bannerDatas: [], dataSource: [], loading: false }

    this.handleOpenCreatePostScreen = this.handleOpenCreatePostScreen.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: true })
    Analytics.trackingScreen(Constants.screenName.home)
    Firebase.database().ref('banners').on('value', (snap) => {
      var bannerDatas = [];
      snap.forEach((child) => {
        console.log('bannerItem', child.val(), child.key)
        bannerDatas.push({ key: child.key, data: child.val() })
      })
      this.setState({ bannerDatas: bannerDatas, loading: false })
    })

    Firebase.database().ref('feedy').on('value', (snap) => {
      var feedyDatas = [];
      snap.forEach((child) => {
        console.log('feedyItem', child.val(), child.key)
        feedyDatas.push({ key: child.key, data: child.val() })
      })
      this.setState({ dataSource: feedyDatas, loading: false })
    })
  }

  handleOpenCreatePostScreen() {
    this.props.navigation.navigate('CreatePostScreen')
  }

  handleOpenPostDetailScreen = (item, ref) => () => {
    console.log('handleOpenPostDetailScreen', item)
    this.props.navigation.navigate('PostDetailScreen', { data: item, ref: ref })
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity onPress={this.handleOpenPostDetailScreen(item, 'feedy/')}>
        <HomeItem key={index} data={item.data} />
      </TouchableOpacity>
    )
  }

  renderDotIndicator() {
    return <PagerDotIndicator pageCount={this.state.bannerDatas.length} />;
  }

  renderHeader() {
    return (
      <IndicatorViewPager
        style={{ height: 200 }}
        indicator={this.renderDotIndicator()}
      >
        {this.state.bannerDatas.map((item, index) => (
          <TouchableOpacity onPress={this.handleOpenPostDetailScreen(item, 'banners/')}>
            <CachedImage key={index} style={{ height: 200 }} source={{ uri: item.data.image }} />
          </TouchableOpacity>))}
      </IndicatorViewPager>
    )
  }

  renderAddButton() {
    return (
      <TouchableOpacity style={styles.buttonAddContainer} onPress={this.handleOpenCreatePostScreen}>
        <Image style={styles.buttonAdd} source={Images.icAdd} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image style={styles.header} source={Images.homeHeader} />
        </View>
        <FlatList
          style={styles.flatList}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          data={this.state.dataSource}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader()}
          keyExtractor={(item, index) => item + index} />
        {this.renderAddButton()}
        <Loading show={this.state.loading} color={Colors.main} backgroundColor={Colors.transparent}/>
      </View>
    )
  }
}

