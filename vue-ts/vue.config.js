export default {
    configureWebpack: {
        entry: './src/main.ts',
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: { appendTsSuffixTo: [/\.vue$/] }
                }
            ]
        }
    }
}