import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import TutorialItem from '../Components/TutorialItem'
import Timeline from 'react-native-timeline-listview'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TutorialPageScreenStyle'
import { Images } from '../Themes';

export default class TutorialPageScreen extends Component {

  tutorials = []

  constructor(props) {
    super(props)

    console.log('test', props)
    this.state = {
      dataSource: props.isEdit ? this.getInitData() : [{ time: '1' }]
    }

    this.handlePressAddbutton = this.handlePressAddbutton.bind(this)
    this.renderDetail = this.renderDetail.bind(this)
    this.handlePressRemove = this.handlePressRemove.bind(this)
  }

  componentDidMount() {
  }

  getInitData() {
    console.log('getInitData', this.props.data.tutorials)
    let dataSource = []
    for (let i = 0; i < this.props.data.tutorials.length; i++) {
      dataSource.push({ time: i, data: this.props.data.tutorials[i] })
    }
    return dataSource
  }

  handlePressAddbutton() {
    var index = this.state.dataSource.length + 1
    this.setState({ dataSource: this.state.dataSource.concat({ time: index }) })
  }

  handlePressRemove(index) {
    var dataSource = this.state.dataSource
    dataSource.splice(index, 1)
    for (let i = 0; i < dataSource.length; i++) {
      dataSource[i].time = i + 1
    }
    console.log('handlePressRemove', index)
    this.setState({ dataSource: dataSource })
  }

  getValue() {
    var tutorials = []
    for (let i = 0; i < this.state.dataSource.length; i++)
      tutorials.push(this.textInputRef[`REF-FLATLIST-1-${i}`].getText())

    return { tutorials: tutorials }
  }

  getError() {
    var error = ''
    // console.log('tutorialItem', this.refs, this.textInputRef)

    for (let i = 0; i < this.state.dataSource.length; i++) {
      if (this.textInputRef[`REF-FLATLIST-1-${i}`].getText() === '') {
        error = 'Chưa nhập bước thực hiện'
        break
      }
    }

    return error
  }

  renderAddContaner() {
    return (
      <TouchableOpacity style={styles.addContainer} onPress={this.handlePressAddbutton}>
        <Text style={styles.addTitle}>Thêm bước thực hiện</Text>
        <Image style={styles.image} source={Images.icAddGreen} />
      </TouchableOpacity>
    )
  }

  renderDetail(rowData, sectionID, rowID) {
    console.log('Item', rowData)
    if (!this.props.isEdit) {
      return (
        <TutorialItem ref={(ref) => this.textInputRef = { ...this.textInputRef, [`REF-FLATLIST-1-${rowID}`]: ref }}
          key={rowID}
          index={parseInt(rowID)}
          onPressRemove={this.handlePressRemove} />
      )
    }
    return (
      <TutorialItem ref={(ref) => this.textInputRef = { ...this.textInputRef, [`REF-FLATLIST-1-${rowID}`]: ref }}
        key={rowID}
        isEdit={true}
        data={rowData.data}
        index={parseInt(rowID)}
        onPressRemove={this.handlePressRemove} />
    )
  }

  render() {
    console.log('render', this.state.dataSource)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>CÁCH THỰC HIỆN</Text>
        {this.renderAddContaner()}
        <Timeline
          data={this.state.dataSource}
          circleSize={20}
          style={styles.timeLineContainer}
          innerCircle={'dot'}
          timeContainerStyle={{}}
          timeStyle={styles.timeStyle}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          renderDetail={this.renderDetail} />
      </View>
    )
  }
}
