var config = {
   entry: ['babel-polyfill','./main.js'],
   output: {
      path:'/',
      filename: 'index.js',
   },
   devServer: {
      inline: true,
      port: 8080,
	  historyApiFallback: true
   },
   module: {
      loaders: [
         {
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}
module.exports = config;