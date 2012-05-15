({
    baseUrl: ".",
    out: "main-built.js",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS.
    //optimize: "none",
    modules: [
        {
            name: "main"
        }
    ]
})