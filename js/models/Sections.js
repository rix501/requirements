define([
    'models/Section',
    'models/database',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone.indexeddb'
], 
function(Section, db) {  
    return Backbone.Collection.extend({
        model: Section
    });
});