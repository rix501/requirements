define([
    'jquery',
    'models/Section',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone-localstorage'
], 
function($, Section) {  
    return Backbone.Collection.extend({
        model: Section,
        localStorage: new Store("reqs-sections-store")
    });
});