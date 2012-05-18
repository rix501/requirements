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
        storeName: 'reqs-projects-store',
        database: db
    });
});