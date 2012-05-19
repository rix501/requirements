define([
    'models/Requirement',
    'models/database',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone.indexeddb'
], 
function(Requirement, db) {  
    return Backbone.Collection.extend({
        model: Requirement,
        storeName: 'reqs-store',
        database: db,
        comparator: function(model){
            return model.get('position');
        }
    });
});