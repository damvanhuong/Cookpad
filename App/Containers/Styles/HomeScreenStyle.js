import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.listBg
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    elevation: 1
  },
  header: {
    height: 45,
    resizeMode: 'contain'
  },
  buttonAddContainer: {
    position: 'absolute',
    bottom: Metrics.doubleBaseMargin,
    right: Metrics.doubleBaseMargin,
  },
  buttonAdd: {
    height: 50,
    width: 50,
    resizeMode: 'contain'
  },
  flatList: {
    margin: Metrics.baseMargin,
  },
  listContent: {
    
  },

})
