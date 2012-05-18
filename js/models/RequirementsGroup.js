define([
    'models/Requirements',
    'models/database',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone.indexeddb'
], 
function(Requirements, db) {  
    return Backbone.Model.extend({
        initialize: function() {
            this.set({'reqs': new Requirements()});
        },
        search : function(letters){
            if(letters == "") return this.get('reqs');
     
            var pattern = new RegExp(letters,"gi");
            return _(this.get('reqs').filter(function(req) {
                return pattern.test(req.get("title")) || pattern.test(req.get("comments"));
            }));
        },
        storeName: 'reqs-group-store',
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