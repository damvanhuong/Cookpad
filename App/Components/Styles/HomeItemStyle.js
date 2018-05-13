import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginRight: 10,
    marginTop: 10
  },
  imageContainer: {
    borderRadius: Metrics.buttonRadius,
    width: Metrics.postWidth,
    height: Metrics.postWidth,
  },
  title : {
    margin: Metrics.baseMargin,
    fontSize: 16,
    fontWeight: 'bold'
  }
})
