import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'white'
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    resizeMode: 'cover'
  },
  infoContainer: {
    paddingHorizontal: 10,
    width: Metrics.screenWidth - 40 - 70 - 80
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  star: {
    color: '#fff000'
  },
  comment: {
    marginTop: 5,
    fontSize: 14,
  },
  date: {
    fontSize: 14,
    width: 80,
  }
})
