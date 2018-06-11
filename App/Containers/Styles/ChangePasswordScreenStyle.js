import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  saveButton: {
    marginTop: Metrics.doubleBaseMargin,
    backgroundColor: Colors.main,
    width: Metrics.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.baseMargin
  },
  saveText: {
    color: 'white',
    fontSize: 16,
  }
})
