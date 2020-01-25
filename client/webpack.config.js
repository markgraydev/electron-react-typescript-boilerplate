const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackRootPlugin = require("html-webpack-root-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const WINDOW_TITLE = "electron-react-typescript-boilerplate";

const publicDirectory = path.join(__dirname, "../public");

module.exports = function (env) {
  return {
    entry: "./client/index.tsx",

    output: {
      filename: "index.js",
      path: path.join(publicDirectory, "js")
    },

    target: "web",
    mode: env.production === "true" ? "production" : "development",

    devtool: "source-map",

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                configFile: "tsconfig.json"
              }
            }
          ]
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: path.join(publicDirectory, "index.html"),
        title: WINDOW_TITLE
      }),
      new HtmlWebpackRootPlugin(),
      new CspHtmlWebpackPlugin({
        "base-uri": "'self'",
        "object-src": "'none'",
        "script-src": ["'self'"],
        "style-src": ["'self'"]
      })
    ]
  };
};
