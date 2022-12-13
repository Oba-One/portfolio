const path = require("path");
const webpack = require("webpack");

const DefinePlugin = webpack.DefinePlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const IS_DEV = process.env.NODE_ENV === "development";

const clientPath = path.resolve(__dirname, "client");
const stylesPath = path.resolve(__dirname, "styles");
const assetsPath = path.resolve(__dirname, "assets");
const modulesPath = "node_modules";

module.exports = {
  entru: [
    path.resolve(clientPath, "index.js"),
    path.resolve(stylesPath, "index.scss"),
  ],
  resolve: {
    modules: [clientPath, assetsPath, stylesPath, modulesPath],
  },
  plugins: [
    new DefinePlugin({
      IS_DEV,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: ".shared/",
          to: "",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(jpe?g|webp|png|gif|svg|woff2?|fnt)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: "raw-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: "glslify-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
