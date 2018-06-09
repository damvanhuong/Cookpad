import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.listBg
  },
  flatList: {
    marginHorizontal: Metrics.baseMargin,
  }
})
