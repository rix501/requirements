define([
    'models/RequirementsGroup',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min',
    'order!vendor/backbone.min',
    'order!vendor/bootstrap-transition',
    'order!vendor/bootstrap-modal'
],
function(RequirementsGroup) {
    return Backbone.View.extend({
        events: {
            "click .save" : "save",
            "click .delete" : "del",
            "hidden" : "remove"
        },
        template: _.template($("#edit-group-template").html()),
        tagName: 'div',
        className: 'modal fade edit-item-modal',
        initialize: function() {
            _.bindAll(this, 'render', 'save', 'hide', 'remove');

            this.section = this.options.section;

            if(!_.isUndefined(this.collection) && _.isUndefined(this.model)){
                this.model = new RequirementsGroup({
                    position: (this.collection.length + 1)
                });
            }
        },
        save: function(){
            if (!this.$('.edit-title').val()) return false;

            var attrs = {
                title: this.$('.edit-title').val(),
                sectionId: this.section.id,
                projectId: this.section.get('projectId'),
                position: this.collection.length + 1
            };

            if(this.model.collection){
                this.model.save(attrs, {
                    success: this.hide
                });
            }
            else if(this.collection){
                this.collection.create(attrs, {
                    success: this.hide
                });
            }

            return false;
        },
        del: function(){
            var reqs = this.model.get('reqs');

            reqs.each(function(req){
                req.destroy();
            });

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