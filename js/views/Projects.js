define([
    'models/Projects',
    'views/Project',
    'views/EditProject',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min',
    'order!vendor/backbone.min',
    'vendor/mustache'
],
function(Projects, ProjectView, EditProjectView) {
    return Backbone.View.extend({
        events: {
            'click .add-project' : 'create'
        },
        template: Mustache.compile($("#projects-template").html()),
        className: 'row-fluid',
        initialize: function() {
            _.bindAll(this, 'render', 'add', 'addAll', 'create');

            this.collection = window.Projects;

            this.collection.bind('reset', this.addAll, this);
            this.collection.bind('add', this.add, this);

            this.collection.bind('all', this.render, this);
        },
        create: function(){
            var editProjectView = new EditProjectView({
                collection: this.collection
            });
            editProjectView.render();

            return;
        },
        add: function(project){
            var projectView = new ProjectView({
                model: project
            });

            this.$('.projects').append(projectView.render().el);
        },
        addAll: function(){
            this.collection.each(this.add);
        },
        render: function() {
            this.$el.html(this.template());

            this.addAll();

            return this;
        }
    });
});