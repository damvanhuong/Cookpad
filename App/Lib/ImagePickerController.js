import ImageResizer from 'react-native-image-resizer'
import { ImageStore, Platform, Alert } from 'react-native'
var ImagePicker = require('react-native-image-picker')
var RNFS = require('react-native-fs');
var RNGRP = null
if (Platform.OS === 'android') {
    RNGRP = require('react-native-get-real-path')
}
var ReadImageData = require('NativeModules').ReadImageData;
const maxDimen = 2000
const maxSize = 2000000
var options = {
    title: 'Select Image',
    rotation: 0,
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Capture Image',
    chooseFromLibraryButtonTitle: 'Select image from gallery',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
    customButtons: []
};
class ImagePickerController {
    static showImagePicker = () => {
        return new Promise((resolve, reject) => {
            ImagePicker.showImagePicker(options, (response) => {
                console.log('showImagePicker')
                if (response.didCancel) {
                    reject('User cancelled image picker')
                } else if (response.error) {
                    Alert.alert("Error", response.error)
                    reject(response.error)
                }
                else if (response.customButton) {
                    console.log(response.customButton)
                }
                else {
                    console.log(response)
                    ImagePickerController.resizeImage(response).then((uri) => {
                        resolve(uri)
                    })
                }
            });
        })
    };
    static launchCamera = () => {
        var options = {
            title: 'Select Image',
            rotation: 0,
            cancelButtonTitle: 'Cancel',
            takePhotoButtonTitle: 'Capture Image',
            chooseFromLibraryButtonTitle: 'Select image from gallery',
        };
        return new Promise((resolve, reject) => {
            ImagePicker.launchCamera(options, (response) => {
                console.log(response)
                ImagePickerController.resizeImage(response).then((uri) => {
                    resolve(uri)
                })
            });
        })
    }
    static resizeImage = (image) => {
        return new Promise((resolve, reject) => {
            if (!image || !image.uri)
                reject('Error resize image')
            else if (image.fileSize > maxSize || (Platform.OS === 'android' && Platform.Version < 23) || (image.originalRotation !== undefined && image.originalRotation !== 0)
                || (!ImagePickerController.isJPEGImage(image))) {
                ImagePickerController
                    .rawPath(image.uri)
                    .then((uri) => {
                        var originalRotation = image.originalRotation !== undefined ? image.originalRotation : 0
                        if (image.uri.indexOf('com.cooky') === -1) {
                            originalRotation = 0
                        }
                        ImageResizer
                            .createResizedImage(uri, maxDimen, maxDimen, 'JPEG', 90, originalRotation)
                            .then((resizedImageUri) => {
                                resolve(resizedImageUri)
                            })
                            .catch((error) => {
                                reject(error)
                                console.log('error ', error)
                            })
                    })
            }
            else {
                resolve(image.uri)
            }
        })
    }
    static resizeListImages = (images) => {
        return new Promise((resolve, reject) => {
            if (images && images.length > 0) {
                var imagesData = []
                for (var index = 0; index < images.length; index++) {
                    var image = images[index];
                    ImagePickerController
                        .resizeImage(image)
                        .then((image) => {
                            imagesData.push(image)
                            if (imagesData.length === images.length) {
                                resolve(imagesData)
                            }
                        })
                }
            }
            else
                resolve([])
        })
    }
    static base64Image = (uri) => {
        return new Promise((resolve, reject) => {
            if (Platform.OS === 'android') {
                ImagePickerController
                    .rawPath(uri)
                    .then((path) => {
                        console.log("path", path)
                        let raw = path.replace('file:/', '')
                        RNFS
                            .readFile(raw, 'base64')
                            .then((imageBase64) => {
                                resolve(imageBase64)
                            })
                    })
            } else {
                RNFS
                    .readFile(uri, 'base64')
                    .then(imageBase64 => {
                        resolve(imageBase64)
                    })
            }
        })
    }
    static rawPath = (uri) => {
        return new Promise((resolve, reject) => {
            if (Platform.OS === 'android') {
                RNGRP
                    .getRealPathFromURI(uri)
                    .then(path => {
                        console.log("path", path)
                        resolve(path)
                    })
                    .catch((error) => {
                        resolve(uri)
                    })
            } else {
                resolve(uri)
            }
        })
    }
    static listBase64Images = (uris) => {
        return new Promise((resolve, reject) => {
            if (uris && uris.length > 0) {
                var imagesData = []
                for (var index = 0; index < uris.length; index++) {
                    var uri = uris[index];
                    ImagePickerController
                        .base64Image(uri)
                        .then((base64Image) => {
                            imagesData.push(base64Image)
                            if (imagesData.length === uris.length) {
                                resolve(imagesData)
                            }
                        })
                }
            } else {
                resolve([])
            }
        })
    }
    static isJPEGImage(image) {
        var mimeType = null
        if (image && image.fileName) {
            mimeType = (image.fileName.substring(image.fileName.lastIndexOf('.') + 1))
            mimeType = mimeType ? mimeType.toLowerCase() : null
        }
        console.log('mimeType', 'image/' + mimeType)
        if (mimeType && (mimeType === 'jpg' || mimeType === 'jpeg'))
            return true
        return false
    }
}
export default ImagePickerController