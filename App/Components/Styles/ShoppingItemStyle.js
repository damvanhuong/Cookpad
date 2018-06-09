import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white'
  },
  image: {
    height: 70,
    width: 70,
    resizeMode: 'cover'
  },
  foodInfoContainer: {
    width: Metrics.screenWidth - 20 - 70,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  foodName: {
    fontSize: 14,
    color: 'black'
  }
})
