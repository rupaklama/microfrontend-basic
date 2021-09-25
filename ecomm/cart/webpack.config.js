// This is going to take some kind a HTML file inside of our project to inject couple of Script Tags inside of it
const HtmlWebpackPlugin = require('html-webpack-plugin');

// integration plugin
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    // this must be port 8082
    port: 8082,
  },
  plugins: [
    // integration plugin
    new ModuleFederationPlugin({
      // cart app
      // note - needs to be exact same in Host config's value 'cart@'
      name: 'cart',

      // remoteEntry.js contains list of files that are available from this project
      // & direction on how to load them for our Container App
      // we can custom name this file
      filename: 'remoteEntry.js',

      // making this modules-files available to other projects
      exposes: {
        // key / value
        // key is just the Aliases filenames - renaming for name collisions
        // './CartShow': './src/index',
        './CartShow': './src/bootstrap',
      },

      // to share dependencies with other projects
      shared: ['faker'],
    }),

    // this plugin is going to take a look for all the files coming out of webpack process
    // & going to find file names & add appropriate Script Tags automatically behind the scenes in index.html
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
