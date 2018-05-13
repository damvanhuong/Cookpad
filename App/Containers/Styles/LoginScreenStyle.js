import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotPassword: {
    marginTop: 5,
    marginRight: Metrics.baseMargin,
    color: 'white',
    fontSize: 16,
    textAlign: 'right',
    width: Metrics.screenWidth
  },
  signInButton: {
    marginTop: Metrics.doubleBaseMargin,
    backgroundColor: Colors.main,
    width: Metrics.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.baseMargin
  },
  signInText: {
    color: 'white',
    fontSize: 16,
  },
  signUp: {
    marginTop: Metrics.doubleBaseMargin,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    width: Metrics.screenWidth
  }
})
