# Installation the packages

**Python**
```bash
apt-get install python-software-properties 
```

**JDK**
```bash
add-apt-repository ppa:webupd8team/java
apt-get update
apt-get install oracle-Java8-installer
```

**Node.js**
```bash
apt-get update
apt-get install nodejs
```

**React Native CLI**
```bash
apt-get install npm
npm install -g react-native-cli
```

**Android Environment**

  1. Android Studio

  [Download and install Android Studio](https://developer.android.com/studio/index.html)

  2. Android SDK

  React Native requires the Android 6.0 (Marshmallow) SDK. 
  SDK Manager: 'Welcome to Android Studio' screen -> Configure-> SDK Manager
  install this items:
  Google APIs
  Android SDK Platform 23
  Intel x86 Atom_64 System Image
  Google APIs Intel x86 Atom_64 System Image
  SDK Tools->Android SDK Build-Tools->23.0.1

  3. Configure the ANDROID_HOME environment variable

  Add the following lines to your $HOME/.bash_profile config file

  ```
  export ANDROID_HOME=$HOME/Android/Sdk
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```
  