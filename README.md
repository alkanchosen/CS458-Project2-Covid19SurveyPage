# CS458Project2

* Commands to run the project (Run them in seperate terminals):
```
npx react-native start
npx react-native run-android (Ensure that an emulator is installed and properly configured)
```

* Android Emulator device configuration (Change the Appium configuration if this is not the case):
  - Pixel 4
  - Android 11

* Before running the command below make sure that Appium Desktop App is installed and running, it can be installed from this link:

  - https://github.com/appium/appium-desktop/releases

* Run this command to run the tests:
```
jest appium
```

* there can be some varitaions for this command like:
```
yarn jest appium
```

* https://reactnative.dev/docs/environment-setup --> React Native CLI Quickstart

* Handy command if a gradle caused error occurs:

```
cd android;
chmod +x gradlew;
./gradlew clean && cd ..;
```
