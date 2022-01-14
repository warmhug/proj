const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    // modifyVars: { "@primary-color": "#1DA57A" },
  })(config, env);

  /**
   * inline Source
   */
  config.plugins.push(new HtmlWebpackPlugin({
    filename: 'index-inline.html',
    template: path.join(__dirname, '/public/index.html'),
    inlineSource: '.(js|css)$',
  }));
  config.plugins.push(new HtmlWebpackInlineSourcePlugin());
  // console.log(config.plugins); process.exit(0);
  return config;
};
