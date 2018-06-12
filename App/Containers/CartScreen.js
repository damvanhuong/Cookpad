import React, { Component } from 'react'
import { FlatList, Text, View, TouchableOpacity, Alert, AsyncStorage, RefreshControl } from 'react-native'
import Firebase from '../Config/Firebase'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CartScreenStyle'
import UserService from '../Config/UserService';
import { SearchBar } from 'react-native-elements'
import ShoppingItem from '../Components/ShoppingItem'
import { CachedImage } from 'react-native-cached-image';
import Loading from '../Components/Loading'
import { Colors } from '../Themes';

const TAG = 'CartScreen'

export default class CartScreen extends Component {

  constructor(props) {
    super(props)

    this.state = { loading: false, dataSource: [] }

    this.renderItem = this.renderItem.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    this.setState({ loading: true })
    console.log(TAG, 'getData', UserService.userInfo)
    let listData = (UserService.userInfo && UserService.userInfo.listShopping !== undefined) ? UserService.userInfo.listShopping : []
    let listShopping = []
    for (let i = 0; i < listData.length; i++) {
      let ref = listData[i].ref + listData[i].key
      Firebase.database().ref(ref).on('value',
        snap => {
          console.log(TAG, '>getData', snap.val())
          listShopping.push(snap.val())
        })
    }
    this.setState({ dataSource: listShopping, loading: false })
  }


  onRefresh() {
    this.getData()
  }

  onPressItem = (item) => () => {
    this.props.navigation.navigate('ShoppingDetailScreen', { rawMaterials: item.rawMaterials, foodName: item.foodName })
  }

  onLongPressItem = (index) => () => {
    Alert.alert(
      'Bạn có muốn xóa khỏi danh sách mua sắm không?',
      '',
      [
        { text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Có', onPress: () => {
            // console.log('OK Pressed')
            this.setState({ loading: true })
            let ref = ''
            let uid = UserService.userInfo.uid
            let dataSource = this.state.dataSource
            let listShopping = UserService.userInfo.listShopping ? UserService.userInfo.listShopping : []
            //Find user ref
            Firebase.database().ref('users')
              .orderByChild('uid')
              .equalTo(uid)
              .once("value", (snapshot) => {
                var datas = [];
                snapshot.forEach(function (child) {
                  ref = 'users/' + child.key
                })
                // update user info
                ref = ref + '/listShopping/' + index
                console.log('ref', ref)
                dataSource.splice(index, 1)
                Firebase.database().ref(ref).remove().then(() => {
                  this.setState({ loading: false, dataSource: dataSource })
                  listShopping.splice(index, 1)
                  UserService.userInfo.listShopping = listShopping
                  AsyncStorage.setItem('userData', JSON.stringify(UserService.userInfo))
                  console.log('Remove item from list shopping successfully !')
                }).catch(error => {
                  this.setState({ loading: false })
                  console.log(error)
                })
              })
          }
        },
      ],
      { cancelable: false }
    )
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity onPress={this.onPressItem(item)} onLongPress={this.onLongPressItem(index)}>
        <ShoppingItem key={index} data={item} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={this.state.dataSource}
          renderItem={this.renderItem}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.onRefresh}
            />
          }
          keyExtractor={(item, index) => item + index} />
        <Loading show={this.state.loading} color={Colors.main} backgroundColor={Colors.transparent} />
      </View>
    )
  }
}

