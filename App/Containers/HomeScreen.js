import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import Firebase from '../Config/Firebase'
import HomeItem from '../Components/HomeItem'
import { connect } from 'react-redux'
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import { CachedImage } from 'react-native-cached-image';
import Constants from '../Config/Constants'
import Analytics from '../Lib/Analytics'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeScreenStyle'
import { Images } from '../Themes';

class HomeScreen extends Component {

  constructor(props) {
    super(props)

    this.state = { bannerDatas: [], dataSource: [] }

    this.handleOpenCreatePostScreen = this.handleOpenCreatePostScreen.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  componentDidMount() {
    Analytics.trackingScreen(Constants.screenName.home)
    Firebase.database().ref('banners').on('value', (snap) => {
      var bannerDatas = [];
      snap.forEach((child) => {
        console.log('bannerItem', child.val(), child.key)
        bannerDatas.push({ key: child.key, data: child.val() })
      })
      this.setState({ bannerDatas: bannerDatas })
    })

    Firebase.database().ref('feedy').on('value', (snap) => {
      var feedyDatas = [];
      snap.forEach((child) => {
        console.log('feedyItem', child.val(), child.key)
        feedyDatas.push({ key: child.key, data: child.val() })
      })
      this.setState({ dataSource: feedyDatas })
    })
  }

  handleOpenCreatePostScreen() {
    this.props.navigation.navigate('CreatePostScreen')
  }

  handleOpenPostDetailScreen = (item) => () => {
    console.log('handleOpenPostDetailScreen', item)
    this.props.navigation.navigate('PostDetailScreen', { data: item })
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity onPress={this.handleOpenPostDetailScreen(item)}>
        <HomeItem key={index} data={item.data} />
      </TouchableOpacity>
    )
  }

  renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }

  renderHeader() {
    return (
      <IndicatorViewPager
        style={{ height: 200 }}
        indicator={this.renderDotIndicator()}
      >
        {this.state.bannerDatas.map((item, index) => (
          <TouchableOpacity onPress={this.handleOpenPostDetailScreen(item)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
