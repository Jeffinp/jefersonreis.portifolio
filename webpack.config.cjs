const path = require('path');

module.exports = {
    mode: 'development', // ou 'production', conforme necessário
    entry: './src/main.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'], // Adiciona .css para ser resolvido
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Expressão regular para arquivos .js e .jsx
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/, // Expressão regular para arquivos .css
                use: ['style-loader', 'css-loader'], // Usando os loaders para CSS
            },
        ],
    },
};
