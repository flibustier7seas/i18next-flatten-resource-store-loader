/* eslint-env node */
var path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        app: "./src/index",
    },

    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
    },

    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },

    module: {
        rules: [
            { test: /locales/, loader: "i18next-flatten-resource-store-loader" },
            { 
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                use: [{
                    loader: "babel-loader",
                    options: { presets: ["react"] },                    
                }],
            },
        ],
    },
};