var path = require('path')

module.exports = {
 entry: './src/index.ts',
 output: {
   filename: 'avatar.js',
   path: path.resolve(__dirname, 'dist'),
   library: 'Avatar',
   libraryTarget: 'umd'
 },
 module: {
   rules: [
     {
       test: /\.tsx?$/,
       loader: 'ts-loader',
       exclude: /node_modules/,
     },
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        enforce: "pre",
        // include: [resolve('src'), resolve('test')],
        exclude: /node_modules/,
      },
   ]
 },
 resolve: {
   extensions: [".ts", ".js"]
 },
 target: 'web'
}