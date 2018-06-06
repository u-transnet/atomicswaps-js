import path from "path";

import webpack from "webpack";
import merge from "webpack-merge";

import common from "./webpack.common";


export default merge(common, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './build.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],

    mode: 'development',
    devtool: 'source-map'
});