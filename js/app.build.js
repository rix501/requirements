({
    baseUrl: ".",
    out: "main-built.js",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS.
    //optimize: "none",
    paths: {
        "jquery": "vendor/require-jquery"
    },
    modules: [
        {
            name: "main",
            exclude: ["jquery"]
        }
    ]
})