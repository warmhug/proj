var webpack = require('webpack')
var WebpackConfig = require('../webpack.config')
var WebpackConfigMin = require('../webpack.config.min')
console.log('WebpackConfig: ', WebpackConfig.output);
console.log('WebpackConfigMin: ', WebpackConfigMin.output);

webpack(WebpackConfig, function (err, stats) {
  if (err) {
    console.log('========== build error ===========');
  } else {
    console.log('========== build success ===========');
  }
});

if (process.env.NODE_ENV == 'production') {
  webpack(WebpackConfigMin, function (err, stats) {
    if (err) {
      console.log('========== build min error ===========');
    } else {
      console.log('========== build min success ===========');
    }
  });
}
