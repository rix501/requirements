define([
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone',
    'order!vendor/backbone.localstorage.min'
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