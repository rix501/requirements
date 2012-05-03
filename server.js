//system and npm libs
var express = require('express');

// Configuration
var app = module.exports = express.createServer();
process.env.NODE_ENV = app.settings.env;

app.configure(function(){
    app.use(app.router);
    app.use(express.static(__dirname + '/'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

app.get("/offline.appcache", function(req, res){
    res.header("Content-Type", "text/cache-manifest");
    res.sendfile("/offline.appcache");
});

app.listen(process.env.C9_PORT || process.env.PORT || 5000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);