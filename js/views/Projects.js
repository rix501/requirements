define([
    'jquery', 
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min'
], 
function($) {  
    return Backbone.View.extend({
        template: _.template($("#projects-template").html()),
        className: 'row-fluid',
        initialize: function() {
            _.bindAll(this, 'render');
        },
        render: function() {
            this.$el.html(this.template());

            return this;
        }
    });
});