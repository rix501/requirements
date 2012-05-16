define([
    'models/Requirements',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone.localstorage.min'
], 
function(Requirements) {  
    return Backbone.Model.extend({
        initialize: function() {
            this.set({'reqs': new Requirements()});
            this.get('reqs').localStorage = new Backbone.LocalStorage("reqs-" + this.get('title') + "-store");
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