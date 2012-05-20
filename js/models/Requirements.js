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
        initialize: function(){
            this.on('change:position', this.update, this);
        },
        model: Requirement,
        storeName: 'reqs-store',
        database: db,
        update: function(model){
            model.save();
        },
        comparator: function(model){
            return model.get('position');
        }
    });
});