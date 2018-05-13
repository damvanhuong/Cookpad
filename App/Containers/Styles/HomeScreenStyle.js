import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  buttonAddContainer: {
    position: 'absolute',
    bottom: Metrics.doubleBaseMargin,
    right: Metrics.doubleBaseMargin,
  },
  buttonAdd: {
    height: 50,
    width: 50,
    resizeMode: 'contain'
  }

})
