define([
    'models/Project',
    'models/Sections',
    'models/database',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone.indexeddb'
], 
function(Project, Sections, db) {  
    return Backbone.Collection.extend({
        initialize: function() {
            this.on('reset', this.addSections, this);
        },
        addSections: function(collection, options){
            collection.each(function(model){
                model.set({
                    'sections': new Sections()
                });
            });
        },
        model: Project,
        storeName: 'reqs-projects-store',
        database: db,
        comparator: function(model){
            return model.get('position');
        }
    });
});