# i18next-flatten-resource-store-loader

`npm install i18next-flatten-resource-store-loader`

## Usage

File structure:
```
└── example
    ├── locales
    │   ├── en
    │   │   └── application.json
    │   ├── ru
    │   │   └── application.json
    │   │
    │   └── index.js
    ├── src
    │   ├── modules
    │   │   └── application
    │   │       ├── Application.jsx
    │   │       ├── index.js
    │   │
    │   └── index.js
    │
    └── webpack.config.js
```

```javascript
// File: webpack.config.js
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
```

```javascript
// File: Application.jsx
import React from "react";
import messages from "../../../locales";
import { IntlProvider, FormattedMessage } from "react-intl";

export default function Application() {
    return (
        <IntlProvider locale="en" messages={messages["en"]}>
            <div>
                <FormattedMessage id='application.helloWorld' />
            </div>
        </IntlProvider>
    );
}
```
