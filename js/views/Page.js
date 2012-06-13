define([
    'order!vendor/jquery.min',
    'order!vendor/underscore.min',
    'order!vendor/backbone.min',
    'vendor/mustache'
],
function() {
    return Backbone.View.extend({
        template: Mustache.compile($("#page-template").html()),
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