import { StyleSheet } from 'react-native'
import {Colors, Metrics} from '../../Themes'

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.windowTint
  },
  indicatorHolder: {
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    height: 100,
    width: 100
  }
})
