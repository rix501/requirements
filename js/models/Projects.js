define([
    'models/Project',
    'models/database',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone.indexeddb'
], 
function(Project, db) {  
    return Backbone.Collection.extend({
        model: Project,
        //localStorage: new Backbone.LocalStorage("reqs-projects-store")
        storeName: 'reqs-projects-store2',
        database: db
    });
});