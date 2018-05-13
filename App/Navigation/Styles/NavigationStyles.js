import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.main,
    shadowColor: 'white',
    shadowOpacity: 0.0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#969696'
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center'
  },
  tabBar: {
    height: 50,
    borderTopWidth: 0.5,
    borderTopColor: '#cfcfcf',
    backgroundColor: Colors.main
  },
  tabStyleiOS: {
    height: 50
  },
  tabStyleAndroid: {
    height: 50
  },
  tabIcon: {
    height: 23,
    width: 23
  },
  tabBarIndicatorStyleiOS: {
    backgroundColor:'white'
  },
  tabBarIndicatorStyleAndroid: {
    backgroundColor:  Colors.tabbarActiveBackground,
    height: 50
  },
  labelStyleiOS: {
    height: 15,
    width: Metrics.screenWidth/5,
    fontSize: 10,
    padding: 0,
  },
  labelStyleAndroid: {
    height: 15,
    width: Metrics.screenWidth/5,
    fontSize: 10,
    marginTop: 5,
    padding: 0,
  },
})
