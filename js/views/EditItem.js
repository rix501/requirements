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

            this.groupId = this.options.groupId;

            if(!_.isUndefined(this.collection) && _.isUndefined(this.model)){
                this.model = new Requirement({
                    reqId: this.groupId + '.' + (this.collection.length + 1)
                });
            }
        },
        save: function(){
            if (!this.$('.edit-title').val()) return;

            var attrs = {
                reqId: this.model.get('reqId'),
                title: this.$('.edit-title').val(),
                comments: this.$('.edit-comments').val(),
                commentsMD: markdown.toHTML( this.$('.edit-comments').val() ),
            }

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