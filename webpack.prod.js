import path from "path";

import webpack from "webpack";
import merge from "webpack-merge";

import common from "./webpack.common";

import UglifyJSPlugin from "clean-webpack-plugin";


export default merge(common, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './build.min.js'
    },
    plugins: [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],

    mode: 'production'
});