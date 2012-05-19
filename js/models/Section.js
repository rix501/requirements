define([
    'models/RequirementsGroups',
    'models/database',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone.indexeddb'
], 
function(RequirementsGroups, db) {  
    return Backbone.Model.extend({
        initialize: function() {
            this.set({
                'reqs-groups': new RequirementsGroups()
            });
        },
        storeName: 'reqs-sections-store',
        database: db,
        toJSON: function(options){
            var json = _.clone(this.attributes);

            _.each(json, function(attr, key){
                //Collection has models!
                if(attr && attr.models){
                    json[key] = [];
                }
            });

            return json;
        }
    });
});