define([
    'jquery',
    'models/Requirements',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone-localstorage'
], 
function($, Requirements) {  
    return Backbone.Model.extend({
        initialize: function() {
            this.set({'reqs': new Requirements()});
            this.get('reqs').localStorage = new Store("reqs-" + this.get('title') + "-store");
        },
        search : function(letters){
            if(letters == "") return this.get('reqs');
     
            var pattern = new RegExp(letters,"gi");
            return _(this.get('reqs').filter(function(req) {
                return pattern.test(req.get("title")) || pattern.test(req.get("comments"));
            }));
        }
    });
});