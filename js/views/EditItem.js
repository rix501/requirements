define([
    'models/Requirement',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/bootstrap-transition', 
    'order!vendor/bootstrap-modal', 
    'order!vendor/markdown'
], 
function(Requirement) {  
    return Backbone.View.extend({
        events: {
            "click .save" : "save",
            "hidden" : "remove"
        },
        template: _.template($("#edit-item-template").html()),
        tagName: 'div',
        className: 'modal fade edit-item-modal',
        initialize: function() {
            _.bindAll(this, 'render', 'save', 'hide', 'remove');

            this.groupId = (this.options.groupId) ? this.options.groupId : this.model.get('groupId');

            if(!_.isUndefined(this.collection) && _.isUndefined(this.model)){
                this.model = new Requirement({
                    position: this.collection.length + 1
                });
            }

            this.section = this.options.section;
            this.group = this.options.group;
        },
        save: function(){
            if (!this.$('.edit-title').val()) return false;

            var attrs = {
                title: this.$('.edit-title').val(),
                comments: this.$('.edit-comments').val(),
                commentsMD: markdown.toHTML( this.$('.edit-comments').val() ),
                groupId: this.groupId,
                position: (this.collection) ? this.collection.length + 1 : (this.model.collection) ? this.model.get('position') : 1
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
        hide: function(){
            this.$el.modal('hide');
        },
        remove: function(){
            this.$el.remove();
        },
        render: function() {
            var json = this.model.toJSON();
            json.positionString = this.section.get('position') + '.' + this.group.get('position') + '.' + this.model.get('position');

            this.$el.html(this.template(json));
            this.$el.modal('show');
            return this;
        }
    });
});