define([
    'models/RequirementsGroups',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min'
    'order!vendor/backbone.localstorage.min'
], 
function(RequirementsGroups) {  
    return Backbone.Model.extend({
        initialize: function() {
            this.set({'reqs-groups': new RequirementsGroups()});
            this.get('reqs-groups').localStorage = new Backbone.LocalStorage("reqs-" + this.get('title') + "-group-store");
        }
    });
});