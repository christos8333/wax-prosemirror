module.exports = function override(config, env) {
  config.module = {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            options: {
              presets: [
                [require("@babel/preset-env"), { modules: false }],
                require("@babel/preset-react")
              ],
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                "babel-plugin-parameter-decorator",
                ["@babel/plugin-proposal-class-properties", { loose: true }]
              ]
            }
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.svg$/,
            use: "svg-inline-loader"
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "[name].[ext]",
                  outputPath: "fonts/"
                }
              }
            ]
          }
        ]
      }
    ]
  };
  return config;
};
