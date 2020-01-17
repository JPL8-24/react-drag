const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const sourceDirectory = path.resolve(__dirname, 'examples/src');
const buildDirectory = path.resolve(__dirname,'src');
const targetDirectory = path.resolve(__dirname, 'examples/dist');

const isDev = process.env.NODE_ENV !== 'production';

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    inject: true,
    template: path.resolve(__dirname, 'examples/src/index.html'),
    minify: {
      collapseWhitespace: !isDev,
      removeComments: !isDev,
      removeRedundantAttributes: !isDev,
    },
  }),
  new ExtractTextPlugin('style.css'),
];

if (!isDev) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  );
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  context: isDev?sourceDirectory : buildDirectory,
  entry: {
    app: isDev?'./app.js' : './index.js',
  },
  output: {
    path: targetDirectory,
    chunkFilename: 'chunk-[chunkhash].js',
    filename: '[name]-[chunkhash].js',
    hashDigestLength: 8,
  },
  devServer: {
    contentBase: sourceDirectory,
    port: 8000,
    before: function (app) {
      app.get('/mock/*', function (req, res) {
        let result
        try {
          const mockDir = path.join(__dirname, 'examples/src/mock')
          const fileName = req.path.replace(/.*?mock\/(.*)$/, '$1') + '.js'
          const fullpath = path.join(mockDir, fileName)
          delete require.cache[fullpath]
          result = require(fullpath)(req.query, req.headers, req.method)
        } catch (e) { 
          result = {json: {}, statusCode: 200}
        }
        res.statusCode = result.statusCode || 200
        res.json(result.json);
      });
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
        // use:['style-loader','css-loader']
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
        // use:['style-loader','css-loader','less-loader']
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
        sideEffects: true,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      antd: '@lianjia/antd',
      '@': path.join(__dirname, 'src'),
    },
    extensions: [".js", ".json", ".jsx", ".less"],
  },
  plugins,
};
