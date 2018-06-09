import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  materialItemContainer: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: Metrics.baseMargin,
    backgroundColor: 'white'
  },
})
