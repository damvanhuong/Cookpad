import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    height: Metrics.dotIndicatorHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white'
  },
  leftTitleContainer: {
    height: Metrics.dotIndicatorHeight,
    padding: Metrics.baseMargin,
  },
  leftTitle: {
    marginTop: 10,
  },
  dotContainer: {
    height: Metrics.dotIndicatorHeight,
    flexDirection: 'row',
  },
  dot: {
    marginTop: 26,
    height: 8,
    width: 8,
    borderRadius: 4,
    margin: 4
  },
  rightTitleContainer: {
    height: Metrics.dotIndicatorHeight,
    padding: Metrics.baseMargin,
  },
  rightTitle: {
    marginTop: 10,
  }
})
