const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

let localCanisters, prodCanisters, canisters;

const superheroes_IC = "kvyhi-eyaaa-aaaag-qassa-cai"

try {
    localCanisters = require(path.resolve(
        ".dfx",
        "local",
        "canister_ids.json"
    ));
} catch (error) {
    console.log("No local canister_ids.json found. Continuing production");
}

function initCanisterIds() {
    try {
        prodCanisters = require(path.resolve("canister_ids.json"));
    } catch (error) {
        console.log(
            "No production canister_ids.json found. Continuing with local"
        );
    }
    let prev = {}
    const network =
        process.env.DFX_NETWORK ||
        (process.env.NODE_ENV === "production" ? "ic" : "local");

    canisters = network === "local" ? localCanisters : prodCanisters;
    for (const canister in canisters) {
        prev[canister.toUpperCase() + "_CANISTER_ID"] =
            canisters[canister][network];
    }
    return prev
}
const canisterEnvVariables = initCanisterIds();
console.log(canisterEnvVariables);

const isDevelopment = process.env.NODE_ENV !== "production";
const frontendDirectory = "www";
const asset_entry = path.join("src", "www", "index.html");

module.exports = env => {
    console.log(env);
    return ({
        target: "web",
        mode: isDevelopment ? "development" : "production",
        entry: {
            // The frontend.entrypoint points to the HTML file for this build, so we need
            // to replace the extension to `.js`.
            index: path.join(__dirname, asset_entry).replace(/\.html$/, ".js"),
        },
        devtool: isDevelopment ? "source-map" : false,
        optimization: {
            minimize: !isDevelopment,
            minimizer: [new TerserPlugin()],
        },
        resolve: {
            alias: {
              '@components': path.resolve(__dirname, './src/www/components'),
              '@hooks': path.resolve(__dirname, './src/www/hooks'),
              '@redux': path.resolve(__dirname, './src/www/redux'),
              '@navigation': path.resolve(__dirname, './src/www/navigation'),
              '@styles': path.resolve(__dirname, './src/www/styles'),
              '@screens': path.resolve(__dirname, './src/www/screens'),
              '@utils': path.resolve(__dirname, './src/www/utils'),
              '@config': path.resolve(__dirname, './src/www/config'),
              '@assets': path.resolve(__dirname, './src/www/assets'),
              '@api': path.resolve(__dirname, './src/www/api'),
              '@declarations': path.resolve(__dirname, './src/declarations'),
            },
            extensions: [".js", ".ts", ".jsx", ".tsx"],
            fallback: {
                assert: require.resolve("assert/"),
                buffer: require.resolve("buffer/"),
                events: require.resolve("events/"),
                stream: require.resolve("stream-browserify/"),
                util: require.resolve("util/"),
            },
        },
        output: {
            filename: "index.js",
            path: path.join(__dirname, "dist", "www"),
        },

        // Depending in the language or framework you are using for
        // front-end development, add module loaders to the default
        // webpack configuration. For example, if you are using React
        // modules and CSS as described in the "Adding a stylesheet"
        // tutorial, uncomment the following lines:
        module: {
            rules: [
                { test: /\.(js|ts|tsx|jsx)$/, loader: "ts-loader" },
                { test: /\.(css|scss)$/, use: ["style-loader", "css-loader", "sass-loader"] },
                { test: /\.(png|jpg|gif|svg|eot|ttf)$/, loader: 'url-loader' }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, asset_entry),
                cache: false,
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.join(__dirname, "src", frontendDirectory, "assets"),
                        to: path.join(__dirname, "dist", frontendDirectory),
                    },
                ],
            }),
            new webpack.EnvironmentPlugin(env.devM == "mo" ? {
                NODE_ENV: "development",
                ...canisterEnvVariables
            } : {
                NODE_ENV: "development",
                SUPERHEROES_CANISTER_ID: "kvyhi-eyaaa-aaaag-qassa-cai",

            }),
            new webpack.ProvidePlugin({
                Buffer: [require.resolve("buffer/"), "Buffer"],
                process: require.resolve("process/browser"),
            }),
        ],
        // proxy /api to port 8000 during development
        devServer: {
            proxy: {
                "/api": {
                    target: "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.ic0.app",
                    changeOrigin: true,
                    pathRewrite: {
                        "^/api": "/api",
                    },
                },
            },
            hot: true,
            watchFiles: path.resolve(__dirname, "./src/www"),
            liveReload: true,
            historyApiFallback: true,
        },
    })
}