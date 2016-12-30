/* eslint-env node */

module.exports = {
    entry: "./src/index.js",

    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
    },

    resolve: {
        extensions: ["", ".ts", ".tsx", ".js", ".jsx"],
    },

    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ["eslint"]},
        ],
        loaders: [
            { test: /\.jsx?$/, loader: "babel", query: { presets: ["es2015", "react"] }},        
            { test: /locales/, loaders: ["i18next-flatten-resource-store"] },
        ],
    },
};