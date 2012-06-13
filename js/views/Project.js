define([
    'views/EditProject',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min',
    'order!vendor/backbone.min'
],
function(EditProjectView) {
    return Backbone.View.extend({
        events: {
            "click .project-title" : "edit"
        },
        template: _.template($("#project-template").html()),
        className: 'project span2 well',
        initialize: function() {
            _.bindAll(this, 'render');
        },
        edit: function(){
            var editProjectView = new EditProjectView({
                model: this.model
            });
            editProjectView.render();
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });
});