define([
    'models/Project',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min',
    'order!vendor/backbone.min',
    'order!vendor/bootstrap-transition',
    'order!vendor/bootstrap-modal'
],
function(Project) {
    return Backbone.View.extend({
        events: {
            "click .save" : "save",
            "click .delete" : "del",
            "hidden" : "remove"
        },
        template: _.template($("#edit-project-template").html()),
        tagName: 'div',
        className: 'modal fade edit-item-modal',
        initialize: function() {
            _.bindAll(this, 'render', 'save', 'hide', 'remove');

            if(!_.isUndefined(this.collection) && _.isUndefined(this.model)){
                this.model = new Project({
                    position: (this.collection.length + 1)
                });
            }
        },
        save: function(){
            if (!this.$('.edit-title').val()) return false;

            var attrs = {
                projectId: this.model.get('projectId'),
                title: this.$('.edit-title').val()
            };

            if(this.model.collection){
                this.model.save(attrs, {
                    success: this.hide,
                    wait: true
                });
            }
            else if(this.collection){
                this.collection.create(attrs, {
                    success: this.hide,
                    wait: true
                });
            }

            return false;
        },
        del: function(){
            var sections;

            //Delete children
            if(this.model.collection){
                sections = this.model.get('sections');

                sections.each(function(section){
                    var groups = section.get('reqs-groups');

                    groups.each(function(group){
                        var reqs = group.get('reqs');

                        reqs.each(function(req){
                            req.destroy();
                        });

                        group.destroy();
                    });

                    section.destroy();
                });
            }

            this.model.destroy();
            this.$el.modal('hide');
            
            return false;
        },
        hide: function(){
            this.$el.modal('hide');
        },
        remove: function(){
            this.$el.remove();
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.modal('show');
            return this;
        }
    });
});