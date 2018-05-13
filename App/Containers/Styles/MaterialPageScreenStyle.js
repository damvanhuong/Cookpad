import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    backgroundColor: Colors.main,
    padding: 15,
    fontSize: 16,
    color: 'white'
  },
  addContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.baseMargin,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.line
  },
  image: {
    height: 28,
    width: 28,
    resizeMode: 'contain'
  },
  addTitle: {
    fontSize: 16,
  }

})
