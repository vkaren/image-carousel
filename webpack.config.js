const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: ["./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  /* target: "node",
  externals: [nodeExternals()],
  externalsPresets: {
    node: true,
  },*/
  mode: "production",
  resolve: {
    extensions: [".js", ".jsx", ".css"],
    alias: {
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@context": path.resolve(__dirname, "src/context/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs|js|jsx$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: { loader: "buble-loader" },
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
    new BundleAnalyzerPlugin(),
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

/** 
module.exports = {
  entry: ["./src/index.js", "./src/styles/styles.css"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  mode: "production",
  resolve: {
    extensions: [".js", ".css"],
    alias: {
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@containers": path.resolve(__dirname, "src/containers/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: "vendors",
          filename: "assets/vendor.[chunkhash].js",
          reuseExistingChunk: true,
          enforce: true,
          priority: 10,
        },
      },
    },
  },
  performance: {
    hints: "error",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devtool: "source-map",
};
*/
