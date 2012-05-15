define([
    'models/Section',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone',
    'order!vendor/backbone.localstorage.min'
], 
function(Section) {  
    return Backbone.Collection.extend({
        model: Section
    });
});