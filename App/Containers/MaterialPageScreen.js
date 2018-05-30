import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import MaterialItem from '../Components/MaterialItem'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MaterialPageScreenStyle'
import { Images } from '../Themes';

export default class MaterialPageScreen extends Component {

  constructor(props) {
    super(props)

    this.state = { dataSource: [] }

    this.handlePressAddButton = this.handlePressAddButton.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.handlePressRemove = this.handlePressRemove.bind(this)
  }

  handlePressAddButton() {
    this.setState({ dataSource: this.state.dataSource.concat({ text: '1' }) })
  }

  handlePressRemove(index) {
    var dataSource = this.state.dataSource
    dataSource.splice(index, 1)
    console.log('handlePressRemove', index)
    this.setState({ dataSource: dataSource })
  }

  getValue() {
    var rawMaterials = []
    for (let i = 0; i < this.state.dataSource.length; i++)
      rawMaterials.push(this.textInputRef[`REF-FLATLIST${i}`].getText())

    return { rawMaterials: rawMaterials }
  }

  getError() {
    var error = ''
    // console.log('materialItem', this.refs, this.textInputRef)

    for (let i = 0; i < this.state.dataSource.length; i++) {
      if (this.textInputRef[`REF-FLATLIST${i}`].getText() === '') {
        error = 'Chưa nhập nguyên liệu'
        break
      }
    }

    return error
  }

  renderAddContaner() {
    return (
      <TouchableOpacity style={styles.addContainer} onPress={this.handlePressAddButton}>
        <Text style={styles.addTitle}>Thêm nguyên liệu</Text>
        <Image style={styles.image} source={Images.icAddGreen} />
      </TouchableOpacity>
    )
  }

  renderItem({ item, index }) {
    console.log('Item', item)
    return (
      <MaterialItem ref={(ref) => this.textInputRef = { ...this.textInputRef, [`REF-FLATLIST${index}`]: ref }}
        key={index} index={index} onPressRemove={this.handlePressRemove} onChangeText={this.handleChangeText} />
    )
  }

  render() {
    console.log('render', this.state.dataSource)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>NGUYÊN LIỆU</Text>
        {this.renderAddContaner()}
        <FlatList
          ref="REF-FLATLIST"
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    )
  }
}
