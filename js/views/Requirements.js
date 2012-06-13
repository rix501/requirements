define([
    'views/Sections',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min',
    'order!vendor/backbone.min',
    'vendor/mustache'
],
function(SectionsView) {
    return Backbone.View.extend({
        template: Mustache.compile($("#requirements-template").html()),
        className: 'row-fluid',
        initialize: function() {
            _.bindAll(this, 'render');

            this.projectId = this.options.projectId;
        },
        render: function() {
            this.$el.html(this.template({ 
                projectId: this.projectId,
                projectTitle: window.Projects.get(this.projectId).get('title') 
            }));
            
            var sectionsView = new SectionsView({
                projectId: this.projectId
            });
            this.$('.sections').append(sectionsView.render().el);

            return this;
        }
    });
});