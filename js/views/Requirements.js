define([
    'views/Sections',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min'
], 
function(SectionsView) {  
    return Backbone.View.extend({
        template: _.template($("#requirements-template").html()),
        className: 'row-fluid',
        initialize: function() {
            _.bindAll(this, 'render');
        },
        render: function() {
            this.$el.html(this.template());
            
            var sectionsView = new SectionsView();
            this.$('.sections').append(sectionsView.render().el);

            return this;
        }
    });
});