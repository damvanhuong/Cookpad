import Analytics from 'react-native-firebase-analytics'

export default class FirebaseAnalytics {

    static trackingScreen(screenName) {
        Analytics.setScreenName(screenName);
    }

    static logEvent(name, parameters) {
        Analytics.logEvent(name, parameters);
    }

}