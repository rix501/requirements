define([
    'models/Project',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone.localstorage.min'
], 
function(Project) {  
    return Backbone.Collection.extend({
        model: Project,
        localStorage: new Backbone.LocalStorage("reqs-projects-store")
    });
});