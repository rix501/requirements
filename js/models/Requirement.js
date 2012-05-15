define([
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone-localstorage'
], 
function() {  
    return Backbone.Model.extend({
        defaults: {
            "title": '',
            "comments": '',
            "commentsMD": ''
        }
    });
});