define([
    'models/database',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone.indexeddb'
], 
function(db) {  
    return Backbone.Model.extend({
        defaults: {
            "title": '',
            "comments": '',
            "commentsMD": ''
        },
        storeName: 'reqs-store',
        database: db
    });
});