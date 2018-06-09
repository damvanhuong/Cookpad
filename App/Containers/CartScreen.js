import React, { Component } from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import Firebase from '../Config/Firebase'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CartScreenStyle'
import UserService from '../Config/UserService';
import { SearchBar } from 'react-native-elements'
import ShoppingItem from '../Components/ShoppingItem'
import { CachedImage } from 'react-native-cached-image';
import { Colors } from '../Themes';

const TAG = 'CartScreen'

export default class CartScreen extends Component {

  constructor(props) {
    super(props)

    this.state = { dataSource: [] }

    this.renderItem = this.renderItem.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    console.log(TAG, 'getData', UserService.userInfo.listShopping)
    let listShoppingId = (UserService.userInfo && UserService.userInfo.listShopping !== undefined) ? UserService.userInfo.listShopping : []
    let listShopping = []
    for (let i = 0; i < listShoppingId.length; i++) {
      let ref = 'feedy/' + listShoppingId[i]
      Firebase.database().ref(ref).on('value',
        snap => {
          console.log(TAG, '>getData', snap.val())
          listShopping.push(snap.val())
        })
    }
    this.setState({ dataSource: listShopping })
  }

  onPressItem = (item) => () => {
    this.props.navigation.navigate('ShoppingDetailScreen', { rawMaterials: item.rawMaterials, foodName: item.foodName })
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity onPress={this.onPressItem(item)}>
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
          keyExtractor={(item, index) => item + index} />
      </View>
    )
  }
}

