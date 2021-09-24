const HtmlWebpackPlugin = require('html-webpack-plugin');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    // this must be 8080
    port: 8080,
  },
  plugins: [
    // integration plugin
    new ModuleFederationPlugin({
      // name is needed for Remote
      name: 'container',

      // lists Projects that the Host can can search to get additional code
      // lists of our Remotes - sub apps
      remotes: {
        // key / value
        // key is the Remote Products App
        // value - products@ is 'name' property in the Products webpack config file with
        // url for the remoteEntry file
        products: 'products@http://localhost:8081/remoteEntry.js',

        // cart app
        cart: 'cart@http://localhost:8082/remoteEntry.js',
      },
    }),

    // this plugin is going to take a look for all the files coming out of webpack process
    // & going to find file names & add appropriate Script Tags automatically behind the scenes in index.html
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
