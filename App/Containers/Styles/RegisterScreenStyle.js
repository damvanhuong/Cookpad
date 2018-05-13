import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpButton: {
    marginTop: Metrics.doubleBaseMargin,
    backgroundColor: Colors.main,
    width: Metrics.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.baseMargin
  },
  signUpText: {
    color: 'white',
    fontSize: 16,
  },
  signIn: {
    marginTop: Metrics.doubleBaseMargin,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    width: Metrics.screenWidth
  }
})
