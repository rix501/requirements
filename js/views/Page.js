define([
    'order!vendor/jquery.min', 
    'order!vendor/underscore.min', 
    'order!vendor/backbone'
], 
function() {  
    return Backbone.View.extend({
        template: _.template($("#page-template").html()),
        el: 'body',
        initialize: function() {
            _.bindAll(this, 'render');
        },
        render: function() {
            this.$el.html(this.template());

            return this;
        }
    });
});