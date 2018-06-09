import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.listBg
  },
  avatarContainer: {
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
  textInput: {
    marginVertical: 20
  }
})
