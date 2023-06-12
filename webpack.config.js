const webpack = require("webpack");

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
      {
        test: /\.png$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
