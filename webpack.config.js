const path = require('path')


module.exports = {
    mode : "development",
    devtool: 'eval-source-map',
    entry: {
        home: "./src/index.ts",
        finance: "./src/html/apps/01_5_finance_logger/main.ts",
        calculator: "./src/html/apps/01_4_digital_calculator/main.ts"
    },
    module: {
        rules: [
            {
                test:/\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'public')
    },
}