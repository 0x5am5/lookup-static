const root = `${__dirname}/app`;
const dist = `${__dirname}/dist`;
const paths = {
  app: `${root}/app.module.js`,
  styles: `${root}/styles`,
  static: {
    index: `${root}/index.html`,
    manifest: `${root}/manifest.json`,
    images: `${root}/img/**/*`,
  },
};

const scripts = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel' // 'babel-loader' is also a valid name to reference
};

const markup = {
  test: /\.html$/,
  loader: 'ngtemplate!html'
};

const config = {
    entry: './app/app.module.js',
    output: {
        path: `./dist/assets/js/`,
        filename: '[name].js',
        publicPath: '/assets/js/'
    },
    module: {         
    	loaders: [
        	scripts,
        	markup
        ]
    },
  	devServer: {
    	port: 8080,
      historyApiFallback: true
  	}
 };

 module.exports = config;