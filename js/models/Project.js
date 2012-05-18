define([
    'models/Sections',
    'models/database',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone.indexeddb'
], 
function(Sections, db) {  
    return Backbone.Model.extend({
        defaults: {
            "title": ''
        },
        initialize: function() {
            this.set({'sections': new Sections()});
            // this.get('sections').localStorage = new Backbone.LocalStorage("reqs-" + this.get('title') + "-sections-store");
            this.get('sections').storeName = 'reqs-sections-store';
            this.get('sections').database = db;
        },
        storeName: 'reqs-projects-store2',
        database: db
    });
});