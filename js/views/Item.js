define([
    'views/EditItem',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min'
], 
function(EditItemView) {  
    return Backbone.View.extend({
        events: {
            "click .req-title" : "edit",
            "click .req-comments" : "edit",
            "click .up" : "up",
            "click .down" : "down"
        },
        template: _.template($("#item-template").html()),
        tagName: 'li',
        className: 'req-item',
        initialize: function() {
            _.bindAll(this, 'render', 'edit', 'up', 'down', 'reorder');

            this.model.bind('change', this.render, this);

            this.section = this.options.section;
            this.group = this.options.group;
        },
        edit: function(){
            var editItemView = new EditItemView({
                model: this.model,
                section: this.section,
                group: this.model
            });
            editItemView.render();
        },
        up: function(event){
            this.reorder(1);

            return false;
        },
        down: function(event){
            this.reorder(-1);

            return false;
        },
        reorder: function(direction){
            // + 1 goes up, - 1 goes down

            if( (this.model.get('position') - direction) > 0 && (this.model.get('position') - direction) <=  this.model.collection.length){
                this.model.set({ position: this.model.get('position') - direction});

                var modelBefore = this.model.collection.at(this.model.get('position') - 1);

                modelBefore.set({ position: modelBefore.get('position') + direction});

                this.model.collection.sort();
            }

            return false;
        },
        render: function() {
            var json = this.model.toJSON();
            json.positionString = this.section.get('position') + '.' + this.group.get('position') + '.' + this.model.get('position');

            this.$el.html(this.template(json));
            return this;
        }
    });
});