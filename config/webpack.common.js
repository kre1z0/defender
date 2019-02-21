const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackCdnPlugin = require("webpack-cdn-plugin");
const autoprefixer = require("autoprefixer");
const { dist, src, public, nodeModules, template, staticPath, evergis, sgis } = require("./paths");
const babelOptions = require("../.babelrc");

module.exports = {
  mode: process.env.NODE_ENV,

  output: {
    path: dist,
    filename: `${staticPath}/js/[name].[hash:7].js`
  },

  resolve: {
    modules: [src, nodeModules],
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
    alias: {
      "@evergis/sp-api": evergis,
      "@evergis/sgis": sgis,
      evergis,
      sgis
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules\/(?![@evergis])/
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        options: babelOptions,
        include: [src]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]",
              importLoaders: 1
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  browsers: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9" // React doesn't support IE8 anyway
                  ],
                  flexbox: "no-2009"
                })
              ]
            }
          },
          require.resolve("sass-loader")
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: `${staticPath}/img/[name].[hash:7].[ext]`
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: `${staticPath}/fonts/[name].[hash:7].[ext]`
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        STATIC_PATH: JSON.stringify(staticPath)
      }
    }),
    new HTMLPlugin({
      title: "Где и как отметить 23 февраля в Москве",
      template,
      minify: true,
      filename: "index.html",
      favicon: "public/favicon.png"
    }),
    new WebpackCdnPlugin({
      modules: [
        {
          name: "react",
          var: "React",
          path: `umd/react`
        },
        {
          name: "react-dom",
          var: "ReactDOM",
          path: `umd/react-dom`
        }
      ],
      prod: process.env.NODE_ENV === "production",
      prodUrl: `//unpkg.com/:name@:version/:path.production.min.js`,
      devUrl: `:name/:path.development.js`,
      publicPath: "../node_modules/"
    }),
    new CopyPlugin([
      {
        from: public,
        to: staticPath,
        ignore: ["*.gitkeep"]
      }
    ])
  ]
};
