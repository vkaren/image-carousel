const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: ["./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
    publicPath: "./",
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  mode: "production",
  resolve: {
    extensions: [".js", ".jsx", ".css"],
    alias: {
      "@icons": path.resolve(__dirname, "src/assets/icons/"),
      "@fonts": path.resolve(__dirname, "src/assets/fonts/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@context": path.resolve(__dirname, "src/context/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs|js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "buble-loader",
          options: {
            transforms: { asyncAwait: false },
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Image carousel",
      template: "./public/index.html",
      inject: true,
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  ],
  optimization: {
    minimize: true,
    minimizer: ["...", new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
