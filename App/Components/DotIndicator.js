import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/DotIndicatorStyle'
import { Colors } from '../Themes';

export default class DotIndicator extends Component {
  // Prop type warnings
  static propTypes = {
    isFinished: PropTypes.bool,
    count: PropTypes.number,
    leftTitle: PropTypes.string,
    onLeftTitlePress: PropTypes.func,
    indexActive: PropTypes.number,
    rightTitle: PropTypes.string,
    onRightTitlePress: PropTypes.func
  }

  // Defaults for props
  static defaultProps = {
    isFinished: false,
    count: 3,
    leftTitle: 'VỀ TRƯỚC',
    onLeftTitlePress: null,
    activeIndex: 0,
    rightTitle: 'TIẾP THEO',
    onRightTitlePress: null
  }

  constructor(props) {
    super(props)
  }

  renderListDots() {
    let elements = []

    for (let i = 0; i < this.props.count; i++) {
      let backgroundColor = this.props.activeIndex == i ? Colors.activeDot : Colors.deactiveDot
      elements.push(
        <View key={i} style={[styles.dot, { backgroundColor: backgroundColor }]}></View>
      )
    }
    return elements
  }

  render() {
    var rightTitle = this.props.isFinished ? [styles.rightTitle, { color: Colors.main }] : styles.rightTitle

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftTitleContainer} onPress={() => this.props.onLeftTitlePress()}>
          <Text style={styles.leftTitle}>{this.props.leftTitle}</Text>
        </TouchableOpacity>
        <View style={styles.dotContainer}>
          {this.renderListDots()}
        </View>
        <TouchableOpacity style={styles.rightTitleContainer} onPress={() => this.props.onRightTitlePress()}>
          <Text style={rightTitle}>{this.props.rightTitle}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
