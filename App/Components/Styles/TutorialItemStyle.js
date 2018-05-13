import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.line,
  },
  input: {
    width: '100%',
    backgroundColor: Colors.grayBg,
    padding: 5,
    height: 150,
    fontSize: 16,
  },
  image: {
    marginVertical: Metrics.baseMargin,
    height: 28,
    width: 28,
    resizeMode: 'contain'
  }
})
