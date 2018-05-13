import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Metrics.baseMargin,
    borderBottomWidth: 1,
    borderColor: Colors.line,
  },
  input: {
    height: 50,
    width: Metrics.screenWidth - 30 -  2*Metrics.baseMargin,
    fontSize: 16,
  },
  image: {
    height: 28,
    width: 28,
    resizeMode: 'contain'
  }
})
