
const React = require('react-native'); 
const { PixelRatio, Dimensions } = React;

const pixelRatio = PixelRatio.get();
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const normalize = (size) => {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (deviceWidth < 360) {
      return size * 0.81;
    }
    // iphone 5
    if (deviceHeight < 667) {
      return size * 0.86;
      // iphone 6-6s
    } else if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size;
    }
    // older phablets
    return size * 1.075;
  } else if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size * 0.86;
    }
    // Catch other weird android width sizings
    if (deviceHeight < 667) {
      return size;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.03;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.09;
  } else if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size * 0.86;
      // Catch other smaller android height sizings
    }
    if (deviceHeight < 667) {
      return size * 1.03;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.075;
    }
    // catch larger phablet devices
    return size * 1.2;
  } else
    // if older device ie pixelRatio !== 2 || 3 || 3.5
    return size * 0.86;
};

module.exports = normalize;