var path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 图片压缩
// var ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
	mode: 'development', // 开发：development 生产：production 
	entry: {  // 多入口
    	build: './src/main.js',
    	base: './lib/base.js'
  	},
  	output: {
    	path: path.resolve(__dirname, './dist'),
    	publicPath: 'dist/',
    	filename: '[name].js'
  	},
  	module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          } 
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },{
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },{ 
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=50000&name=[path][name].[ext]'
      },
      {
         test: /\.css$/,
         use: [ 'style-loader', 'css-loader' ]
       }, {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      }
    ]
  	},
  	resolve: {
    	alias: {
      		'vue$': 'vue/dist/vue.esm.js'
    	}
  	},
  	devServer: {
    	historyApiFallback: true,
    	noInfo: true,
    	overlay: true,
    	port: 8721, // 端口
    	// host:'192.168.31.83'
  	},
  	performance: {
    	hints: false
  	},
  	devtool: '#eval-source-map',
  	plugins: [
    	// Vue-loader在15.*之后的版本都需要伴生 VueLoaderPlugin 组件
    	new VueLoaderPlugin()
    	// 图片压缩
    	// new ImageminPlugin({
    	//     disable: process.env.NODE_ENV !== 'production', 
    	//     pngquant: {
    	//         quality: '95-100'
    	//     }
    	// })
    	// 引入jq
    	// new webpack.ProvidePlugin({
    	//      jQuery: "jquery",
   	 	//      $: "jquery"
    	//  })
  	]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
