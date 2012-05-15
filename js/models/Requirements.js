define([
    'jquery',
    'models/Requirement',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone-localstorage'
], 
function($, Requirement) {  
    return Backbone.Collection.extend({
        model: Requirement
    });
});