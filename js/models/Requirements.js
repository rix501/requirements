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
            this.on('remove', this.removed, this);
        },
        model: Requirement,
        storeName: 'reqs-store',
        database: db,
        removed: function(){
            this.each(function(model, index, list){
                model.set({ position: index + 1});
            });

            this.sort();
        },
        update: function(model){
            model.save();
        },
        comparator: function(model){
            return model.get('position');
        }
    });
});