Wax prosemirror Monorepo

Clone the repo
  
yarn with node > 9.11.2
  
Running `yarn default` should bring the default editor
  
Scripts: `yarn` , `yarn clean`, `yarn reset`  

Create a new project in Editors.

**CREATE-REACT-APP** can be used to setup a new project

A simple `sh` script exists in the root folder which will
create a default editor by running `./create.sh your-editor-name`.

Alternatively:


*  `cd editors`
  

*  `yarn create react-app my-editor`
  

*  `npm install react-app-rewired --save-dev` (to let you overide Webpack's config)
  

*  Create a `config-overrides.js` file in the root of "my-editor"
  

*  add the following code

```
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
```

*  finally edit the package.json file and replace scripts with the following

```
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject"
  },
```
Inside "my-editor" run `yarn start`

  Also you can edit the main package.json of the monorepo in the scripts section to start your editor from there
  
  `"myeditor": "cd editors/my-editor && yarn start"`
    
  and run `yarn myeditor`
  
Now you can add the dependencies to build your editor.
