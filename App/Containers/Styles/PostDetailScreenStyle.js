import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    height: 180,
    width: Metrics.screenWidth
  },
  backButtonContainer: {
    position: 'absolute',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButton: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  indicatorContainer: {
    height: 55
  },
  indicatorText: {
    fontSize: 16,
  },
  indicatorSelectedText: {
    fontSize: 16,
    color: Colors.main
  },
  selectedBorderStyle: {
    height: 3,
    backgroundColor: Colors.main,
  },
  materialItemContainer: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: Metrics.baseMargin,
    backgroundColor: 'white'
  },
  timeLineContainer: {
    padding: Metrics.baseMargin,
    backgroundColor: 'white'
  },
  timeStyle: {
    textAlign: 'center',
    backgroundColor: '#ff9797',
    color: 'white',
    padding: 2,
    borderRadius: 10
  },
  tutorialItemContainer: {
    borderBottomWidth: 1,
    borderColor: Colors.line,
    paddingVertical: 10
  }
})
