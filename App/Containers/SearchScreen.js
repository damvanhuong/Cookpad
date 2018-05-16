import React, { Component } from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import Firebase from '../Config/Firebase'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SearchScreenStyle'
import UserService from '../Config/UserService';
import { SearchBar } from 'react-native-elements'
import Search from 'react-native-search-box';
import HomeItem from '../Components/HomeItem'
import { CachedImage } from 'react-native-cached-image';
import { Colors } from '../Themes';

class SearchScreen extends Component {

  constructor(props) {
    super(props)

    this.state = { dataSource: [], textSearch: '' }

    this.renderItem = this.renderItem.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  onValueChange() {

  }

  onSearch(text) {
    var queryText = text
    Firebase.database().ref('feedy')
      .orderByChild('foodName')
      .startAt(queryText)
      .endAt(queryText + "\uf8ff")
      .once("value", (snapshot) => {
        var datas = [];
        // console.log('SearchScreen', snapshot.val());
        snapshot.forEach(function (child) {
          console.log('SearchScreen', child.val());
          datas.push(child.val())
        })
        this.setState({ dataSource: datas })
      })
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity>
        <HomeItem key={index} data={item} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <Search
            backgroundColor={Colors.main}
            onSearch={this.onSearch}
          />
        </View>
        <FlatList
          style={styles.flatList}
          numColumns={2}
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item + index} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
