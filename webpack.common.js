import path from "path";


export default {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './build.js'
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
            }
        ]
    },
    plugins: [
    ],

};