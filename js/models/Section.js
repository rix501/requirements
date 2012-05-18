define([
    'models/RequirementsGroups',
    'models/database',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone.indexeddb'
], 
function(RequirementsGroups, db) {  
    return Backbone.Model.extend({
        initialize: function() {
            this.set({'reqs-groups': new RequirementsGroups()});
            //this.get('reqs-groups').localStorage = new Backbone.LocalStorage("reqs-" + this.get('title') + "-group-store");

            this.get('reqs-groups').storeName = 'reqs-group-store';
            this.get('reqs-groups').database = db;
        },
        storeName: 'reqs-sections-store',
        database: db
    });
});