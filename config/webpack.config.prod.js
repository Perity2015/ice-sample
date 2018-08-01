'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const loaders = require('./loaders');
const CustomAlias = require("./alias");

const publicPath = paths.servedPath;

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const publicUrl = publicPath.slice(0, -1);

const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

const cssFilename = '[name].css';

module.exports = {

    bail: true,

    devtool: shouldUseSourceMap ? 'source-map' : false,

    entry: [require.resolve('./polyfills'), paths.appIndexJs],

    output: {
        path: paths.appBuild,
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: publicPath,
        devtoolModuleFilenameTemplate: info =>
            path
                .relative(paths.appSrc, info.absoluteResourcePath)
                .replace(/\\/g, '/'),
    },
    resolve: {
        modules: ['node_modules', paths.appNodeModules].concat(
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
        ),
        extensions: [
            '.mjs',
            '.web.ts',
            '.ts',
            '.web.tsx',
            '.tsx',
            '.web.js',
            '.js',
            '.json',
            '.web.jsx',
            '.jsx',
        ],
        alias: CustomAlias,
        plugins: [
            new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
            new TsconfigPathsPlugin({configFile: paths.appTsConfig}),
        ],
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                loader: require.resolve('source-map-loader'),
                enforce: 'pre',
                include: paths.appSrc,
            },
            {
                oneOf: [
                    loaders.urlLoader,
                    loaders.jsLoader,
                    loaders.tsLoader,
                    loaders.cssLoaderProdExtract,
                    loaders.lessLoaderProdExtract,
                    loaders.fileLoader,
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin(env.stringified),
        new UglifyJsPlugin({
            uglifyOptions: {
                parse: {
                    // we want uglify-js to parse ecma 8 code. However we want it to output
                    // ecma 5 compliant code, to avoid issues with older browsers, this is
                    // whey we put `ecma: 5` to the compress and output section
                    // https://github.com/facebook/create-react-app/pull/4234
                    ecma: 8,
                },
                compress: {
                    ecma: 5,
                    warnings: false,
                    // Disabled because of an issue with Uglify breaking seemingly valid code:
                    // https://github.com/facebook/create-react-app/issues/2376
                    // Pending further investigation:
                    // https://github.com/mishoo/UglifyJS2/issues/2011
                    comparisons: false,
                },
                mangle: {
                    safari10: true,
                },
                output: {
                    ecma: 5,
                    comments: false,
                    // Turned on because emoji and regex is not minified properly using default
                    // https://github.com/facebook/create-react-app/issues/2488
                    ascii_only: true,
                },
            },
            // Use multi-process parallel running to improve the build speed
            // Default number of concurrent runs: os.cpus().length - 1
            parallel: true,
            // Enable file caching
            cache: true,
            sourceMap: shouldUseSourceMap,
        }),    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
        new ExtractTextPlugin({
            filename: cssFilename,
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            tsconfig: paths.appTsConfig,
            tslint: paths.appTsLint,
        }),
    ],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
};
