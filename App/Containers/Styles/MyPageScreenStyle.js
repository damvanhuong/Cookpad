import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.listBg
  },
  userInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white'
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    resizeMode: 'cover',
  },
  userName: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  itemContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'white'
  },
  itemText: {
    fontSize: 16,
    color: 'black'
  },
  itemArrowRight: {
    height: 30/1.4,
    width: 18/1.4,
    resizeMode: 'contain',
  }
})
