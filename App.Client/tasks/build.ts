import Webpack = require("webpack");
import Path    = require("path");
import rimraf  = require("rimraf");
import config  = require("./webpack-config");

const DEV   = "DEV";
const PROD  = "PROD";
const WATCH = "WATCH";
const BUILD = "BUILD";
const ENV   = process.argv[2] == "--dev"   ? DEV : PROD;
const MODE  = process.argv[3] == "--watch" ? WATCH : BUILD;

let compiler = Webpack(config(ENV));

let statOptions: Webpack.Stats.ToStringOptions =
{
    assets:   true,
    version:  true,
    colors:   true,
    warnings: true,
    errors:   true
};

let callback: Webpack.Compiler.Handler =
    (error, stats) => error ? console.log(error.message) : console.log(stats.toString(statOptions));

let isWatching = MODE == WATCH;

let publicPath = Path.resolve(__dirname, "../../App.Server/public");

let build = () =>
{
    console.log(`Starting ${isWatching ? "Watch" : "build"} using ${ENV == "DEV" ? "development" : "production"} configuration.`);
    if (isWatching)
        compiler.watch({aggregateTimeout: 500, poll: true, ignored: /node_modules/ }, callback);
    else
        compiler.run(callback);
}

rimraf(publicPath, build);