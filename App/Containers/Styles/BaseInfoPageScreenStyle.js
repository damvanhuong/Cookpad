import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Images } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 2
  },
  imageContainer: {
    height: 200,
    backgroundColor: Colors.grayBg,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBg: {
    height: 100,
    resizeMode: 'contain'
  },
  pickerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    backgroundColor: Colors.windowTint,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icCamera: {
    resizeMode: 'contain',
    height: 40,
    width: 40,
  },
  line: {
    height: 1,
    backgroundColor: Colors.line
  },
  textInput: {
    height: 50,
    fontSize: 16,
    paddingHorizontal: Metrics.baseMargin
  },
  title: {
    backgroundColor: Colors.grayBg,
    padding: 15,
    borderTopWidth: 1,
    borderColor: Colors.line,
    fontSize: 16
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.baseMargin,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.line
  },
  timeTitle: {
    fontSize: 16
  },
  timeText: {
    fontSize: 16,
    color: Colors.main
  }

})
