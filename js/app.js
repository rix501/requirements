define([
    'models/Projects',
    'views/Page',
    'views/Projects',
    'views/Requirements',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min'
], 
function(Projects, PageView, ProjectsView, RequirementsView) {  
    return Backbone.Router.extend({
        routes: {
            '': 'home',
            ':projectId/requirements' : 'requirements'
        },
        initialize: function() {
            this.pageView = new PageView();
            this.pageView.render();

            this.currentView = null;
            window.Projects = null;
        },
        isProjectsLoaded: function(cb){
            if(_.isNull(window.Projects)){
                window.Projects = new Projects();
                window.Projects.fetch({
                    success: cb
                });
            }
            else{
                cb();
            }
        },
        updateContent: function(){
            this.pageView.$('#content').html(this.currentView.render().el);
        },
        home: function() {
            this.isProjectsLoaded(_.bind(function(){
                this.currentView = new ProjectsView();
                this.updateContent();
            }, this));
        },
        requirements: function(projectId) {
            this.isProjectsLoaded(_.bind(function(){
                this.currentView = new RequirementsView({
                    projectId: projectId
                });
                this.updateContent();
            }, this));
        }
    });
});