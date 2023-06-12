module.exports = {
  externals: {
    "pg-connection-string": "commonjs pg-connection-string",
    "pg-hstore": "commonjs pg-hstore",
  },
  resolve: {
    fallback: {
      fs: false,
    },
  },
  resolve: {
    alias: {
      fs: "browserify-fs",
    },
  },
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      fs: false,
    },
  },
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
    },
  },
  entry: ["./client/index.js"],
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
  },
  context: __dirname,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },
};

// const webpack = require('webpack');
// module.exports = function override(config) {
// 		const fallback = config.resolve.fallback || {};
// 		Object.assign(fallback, {
//     	"crypto": require.resolve("crypto-browserify"),
//       "stream": require.resolve("stream-browserify"),
//       "assert": require.resolve("assert"),
//       "http": require.resolve("stream-http"),
//       "https": require.resolve("https-browserify"),
//       "os": require.resolve("os-browserify"),
//       "url": require.resolve("url")
//       })
//    config.resolve.fallback = fallback;
//    config.plugins = (config.plugins || []).concat([
//    	new webpack.ProvidePlugin({
//     	process: 'process/browser',
//       Buffer: ['buffer', 'Buffer']
//     })
//    ])
//    return config; }
