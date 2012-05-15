define([
    'models/Project',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone-localstorage'
], 
function(Project) {  
    return Backbone.Collection.extend({
        model: Project,
        localStorage: new Store("reqs-projects-store")
    });
});