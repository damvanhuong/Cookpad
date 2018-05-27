import { StackNavigator, TabNavigator } from 'react-navigation'
import RatingPageScreen from '../Containers/RatingPageScreen'
import CommentPageScreen from '../Containers/CommentPageScreen'
import PostDetailScreen from '../Containers/PostDetailScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import CreatePostScreen from '../Containers/CreatePostScreen'
import CartScreen from '../Containers/CartScreen'
import FavoriteScreen from '../Containers/FavoriteScreen'
import SearchScreen from '../Containers/SearchScreen'
import MyPageScreen from '../Containers/MyPageScreen'
import HomeScreen from '../Containers/HomeScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import LoginScreen from '../Containers/LoginScreen'
import React from 'react'

import { Image, Platform } from 'react-native'
import { Colors, Images } from '../Themes'

import styles from './Styles/NavigationStyles'

const TabBarScreen = TabNavigator(
  {
    HomeTab: {
      screen: HomeScreen,
      path: '/home',
      navigationOptions: {
        headerTitleAllowFontScaling: false,
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image resizeMode='contain' style={styles.tabIcon}
            source={Images.tabbarHome} />
        )
      }
    },
    CartTab: {
      screen: CartScreen,
      path: '/cart',
      navigationOptions: {
        headerTitleAllowFontScaling: false,
        tabBarLabel: 'Cart',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image resizeMode='contain' style={styles.tabIcon}
            source={Images.tabbarShopping} />
        )
      }
    },
    FavoriteTab: {
      screen: FavoriteScreen,
      path: '/favorite',
      navigationOptions: {
        headerTitleAllowFontScaling: false,
        tabBarLabel: 'Favorite',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image resizeMode='contain' style={styles.tabIcon}
            source={Images.tabbarFavorite} />
        )
      }
    },
    SearchTab: {
      screen: SearchScreen,
      path: '/search',
      navigationOptions: {
        headerTitleAllowFontScaling: false,
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image resizeMode='contain' style={styles.tabIcon}
            source={Images.tabbarSearch} />
        )
      }
    },
    MyPageTab: {
      screen: MyPageScreen,
      path: '/my-page',
      navigationOptions: {
        headerTitleAllowFontScaling: false,
        tabBarLabel: 'Mypage',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image resizeMode='contain' style={styles.tabIcon}
            source={Images.tabbarMyPage} />
        )
      }
    },
  }, {
    tabBarOptions: {
      allowFontScaling: false,
      activeTintColor: 'white',
      activeBackgroundColor: Colors.tabbarActiveBackground,
      inactiveTintColor: 'white',
      inactiveBackgroundColor: Colors.main,
      style: styles.tabBar,
      upperCaseLabel: false,
      showLabel: true,
      showIcon: true,
      tabStyle: Platform.OS === 'ios' ? styles.tabStyleiOS : styles.tabStyleAndroid,
      iconStyle: {
        marginTop: 10,
        width: 23,
        height: 23
      },
      labelStyle: Platform.OS === 'ios' ? styles.labelStyleiOS : styles.labelStyleAndroid,
      indicatorStyle: Platform.OS === 'ios' ? styles.tabBarIndicatorStyleiOS : styles.tabBarIndicatorStyleAndroid
    },
    navigationOptions: ({ navigation }) => ({
      headerTitleAllowFontScaling: false,
      headerStyle: styles.header,
      headerMode: 'screen',
      statusBarStyle: 'dark-content',
    }),
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
)

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  RatingPageScreen: { screen: RatingPageScreen },
  CommentPageScreen: { screen: CommentPageScreen },
  PostDetailScreen: { screen: PostDetailScreen },
  LaunchScreen: { screen: LaunchScreen },
  CreatePostScreen: { screen: CreatePostScreen },
  RegisterScreen: { screen: RegisterScreen },
  LoginScreen: { screen: LoginScreen },
  TabBarScreen: {screen: TabBarScreen},
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
    navigationOptions: ({navigation}) => ({
      headerTintColor: 'white',
      headerBackTitle: null,
      headerTitleAllowFontScaling: false,
      headerTitleStyle: styles.headerTitle,
      headerStyle: styles.header,
      headerMode: 'screen',
      statusBarStyle: 'dark-content'
    })
  })

export default PrimaryNav
