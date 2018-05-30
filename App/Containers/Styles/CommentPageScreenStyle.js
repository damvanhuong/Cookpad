import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

const imageHeight = 180
const tabHeight = 55

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  },
  flatList: {
  },
  ratingContainer: {
    position: 'absolute',
    top: Metrics.screenHeight - imageHeight - tabHeight - 100,
    right: Metrics.doubleBaseMargin,
    height: 50
  },
  ratingImage: {
    height: 50,
    width: 50,
    resizeMode: 'contain'
  },
  modalContainer: {
    borderRadius: 10,
    backgroundColor: 'white'
  },
  modalContent: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalStar: {
    color: '#fff000'
  },
  modalTitle: {
    textAlign: 'center',
    paddingVertical: 10,
    borderColor: Colors.line,
    borderBottomWidth: 1,
    fontWeight: 'bold',
    fontSize: 18
  },
  textInput: {
    marginTop: 20,
    borderColor: Colors.line,
    borderWidth: 1,
    height: 100,
    width: Metrics.screenWidth - 80,
    fontSize: 16,
    paddingHorizontal: Metrics.baseMargin
  },
  sendButtonContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButton: {
    borderRadius: 5,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.main,
    overflow: 'hidden',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
