define([
    'views/EditItem',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone'
], 
function(EditItemView) {  
    return Backbone.View.extend({
        events: {
            "click" : "edit"
        },
        template: _.template($("#item-template").html()),
        tagName: 'li',
        className: 'req-item',
        initialize: function() {
            _.bindAll(this, 'render', 'edit');

            this.model.bind('change', this.render, this);
        },
        edit: function(){
            var editItemView = new EditItemView({model: this.model});
            editItemView.render();
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});