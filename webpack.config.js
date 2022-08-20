const path = require('path')

module.exports = {
    mode: 'production',
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
    watchOptions: {
        ignored: /node_modules/
    }
}