module.exports = function override(config, env) {
  config.module = {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: "babel-loader",
        options: {
          presets: [
            [require("@babel/preset-env"), { modules: false }],
            require("@babel/preset-react")
          ],
          plugins: [require("@babel/plugin-proposal-class-properties")]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg$/,
        use: "svg-inline-loader"
      }
    ]
  };
  return config;
};
