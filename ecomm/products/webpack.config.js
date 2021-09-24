const HtmlWebpackPlugin = require('html-webpack-plugin');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    // this must be port 8081
    port: 8081,
  },
  plugins: [
    // integration plugin
    new ModuleFederationPlugin({
      // products app
      // note - needs to be exact same in Host config's value 'products@'
      name: 'products',

      // remoteEntry.js contains list of files that are available from this project
      // & direction on how to load them for our Container App
      // we can custom name this file
      filename: 'remoteEntry.js',

      // making this modules-files available to other projects
      exposes: {
        // key / value
        // key is just the Aliases filenames - renaming
        // './ProductsIndex': './src/index',

        // since 'bootstrap' is exporting mount function
        './ProductsIndex': './src/bootstrap',
      },

      // to share dependencies with other projects
      shared: ['faker'],
      // Different syntax to get only ONE single version copy of dependency - version 4 ony..not 5 not 6
      // shared: {
      //   faker: {
      // singleton loading
      // this is saying we only want to load up One Single version Copy of Faker dependency
      //     singleton: true,
      //   },
      // },
    }),

    // this plugin is going to take a look for all the files coming out of webpack process
    // & going to find file names & add appropriate Script Tags automatically behind the scenes in index.html
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
