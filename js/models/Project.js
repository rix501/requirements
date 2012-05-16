define([
    'models/Sections',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone.localstorage.min'
], 
function(Sections) {  
    return Backbone.Model.extend({
        defaults: {
            "title": ''
        },
        initialize: function() {
            this.set({'sections': new Sections()});
            this.get('sections').localStorage = new Backbone.LocalStorage("reqs-" + this.get('title') + "-sections-store");
        }
    });
});