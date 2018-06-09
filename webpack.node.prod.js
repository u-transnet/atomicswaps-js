import path from "path";

import merge from "webpack-merge";
import WebpackShellPlugin from "webpack-shell-plugin";

import prod from "./webpack.prod";


export default merge(prod, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './build.node.min.js'
    },
    plugins: [
        new WebpackShellPlugin({
            onBuildEnd: 'node fix-webpack-node-bug.js'
        })
    ],
    externals: {
        scrypt: "scrypt",
        websocket: "websocket",
    },
    target: 'node'
});