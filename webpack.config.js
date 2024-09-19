// webpack.config.js
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src/index.ts', // Entry point for the package
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd', // Universal module definition
    globalObject: 'this', // Compatibility with Node.js and browser environments
  },
  externals: [nodeExternals()], // Exclude node_modules (such as React) from the bundle
  module: {
    rules: [
      {
        test: /\.ts(x?)$/, // Transpile TypeScript and TSX files
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Handle .ts, .tsx, and .js extensions
  },
};
