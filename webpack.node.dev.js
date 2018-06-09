import path from "path";

import merge from "webpack-merge";
import WebpackShellPlugin from "webpack-shell-plugin";

import dev from "./webpack.dev";


export default merge(dev, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './build.node.js'
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