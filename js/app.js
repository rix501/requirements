define([
    'jquery',
    'views/Page',
    'views/Projects',
    'views/Requirements',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min'
], 
function($, PageView, ProjectsView, RequirementsView) {  
    return Backbone.Router.extend({
        routes: {
            '': 'home',
            ':project/requirements' : 'requirements'
        },
        initialize: function() {
            this.pageView = new PageView();
            this.pageView.render();

            this.currentView = null;
        },
        updateContent: function(){
            this.pageView.$('#content').html(this.currentView.render().el);
        },
        home: function() {
            this.currentView = new ProjectsView();
            this.updateContent();
        },
        requirements: function(project) {
            this.currentView = new RequirementsView();
            this.updateContent();
        }
    });
});