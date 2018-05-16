import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.listBg
  },
  searchBarContainer: {
    backgroundColor: Colors.main,
    paddingVertical: 5,
    paddingHorizontal: 3
  },
  flatList: {
    marginHorizontal: Metrics.baseMargin,
  },
})
