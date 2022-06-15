const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public')
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    devServer: {
        static: {
            directory:  path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    }
}