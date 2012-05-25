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
            "commentsMD": '',
            "position": 0
        },
        initialize: function(){
            //this.set({ position: (this.collection) ? this.collection.length + 1 : 1 });
        },
        storeName: 'reqs-store',
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