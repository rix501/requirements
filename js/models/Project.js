define([
    'models/Sections',
    'models/database',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone.indexeddb'
], 
function(Sections, db) {  
    return Backbone.Model.extend({
        defaults: {
            "title": ''
        },
        initialize: function() {
            this.set({'sections': new Sections()});
        },
        storeName: 'reqs-projects-store',
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