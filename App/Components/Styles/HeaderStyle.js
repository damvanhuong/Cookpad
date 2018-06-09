import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.main,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
  ,
  leftContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  titleContainer: {
    height: 50,
    width: Metrics.screenWidth - 120,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 16
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 80,
    paddingRight: 20,
  },
  rightText: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    color: 'black',
  }
})
