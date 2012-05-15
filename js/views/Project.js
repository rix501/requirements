define([
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone'
], 
function() {  
    return Backbone.View.extend({
        template: _.template($("#project-template").html()),
        className: 'project span2 well',
        initialize: function() {
            _.bindAll(this, 'render');
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });
});