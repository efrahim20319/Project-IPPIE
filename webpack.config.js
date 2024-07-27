// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const  dotenv =  require("dotenv");
dotenv.config()
module.exports = {
    "entry": "./variable-exporter.js",
    "output": {
        "filename": "bundle.js",
        "path": path.resolve(__dirname, "dist")
    },
    // other webpack configuration
    plugins: [
        new webpack.DefinePlugin({
            'APP': JSON.stringify(process.env.APP_PORT),
        }),
    ],
};


