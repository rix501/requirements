define([
    'models/RequirementsGroup',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min'
    'order!vendor/backbone.localstorage.min'
], 
function(RequirementsGroup) {  
    return Backbone.Collection.extend({
        model: RequirementsGroup,
        search : function(letters){
            if(letters == "") return this;
     
            var pattern = new RegExp(letters,"gi");
            return _(this.filter(function(reqsGroup) {
                return pattern.test(reqsGroup.get("title")) ||  reqsGroup.search(letters).size() > 0 ;
            }));
        }
    });
});