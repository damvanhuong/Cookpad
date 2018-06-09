import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import Header from '../Components/Header'
import { connect } from 'react-redux'
import { Colors } from '../Themes';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ShoppingDetailScreenStyle'

class ShoppingDetailScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      rawMaterials: props.navigation.getParam('rawMaterials', []),
      title: props.navigation.getParam('foodName', '')
    }

    this.goBack = this.goBack.bind(this)
  }

  goBack() {
    this.props.navigation.goBack()
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

  render() {
    return (
      <View style={styles.container}>
        <Header onLeftPress={this.goBack} title={this.state.title} />
        <FlatList
          data={this.state.rawMaterials}
          renderItem={this.renderMaterialItem} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingDetailScreen)
