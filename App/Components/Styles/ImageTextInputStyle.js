import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 10
  },
  imageContainer: {
    backgroundColor: Colors.iconBackground,
    height: 50,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 25,
    height: 25,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: Colors.textInputBackground
  },
  textInput: {
    height: 50,
    fontSize: 16
  }
})
