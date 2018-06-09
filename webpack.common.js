import path from "path";

export default {
    entry: {
        app: './src/main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            },
        ],
    },
};