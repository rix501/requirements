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
            "sortstop": "sort",
            "sortreceive": "changeGroup"
        },
        template: _.template($("#item-template").html()),
        tagName: 'li',
        className: 'req-item',
        initialize: function() {
            _.bindAll(this, 'render', 'edit', 'reorder', 'sort', 'changeGroup');

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
        changeGroup: function(event, ui, model){
            this.model.collection.remove(this.model);
            model.get('reqs').add(this.model);
            this.model.set({groupId: model.id});
            this.group = model;
            this.render();

            this.sort(event, ui);
        },
        sort: function(event, ui){
            //Let's get new position
            var newPos = ui.item.parent().children('li').index(ui.item[0]) + 1;
            var oldPos = this.model.get('position');

            this.reorder(oldPos, newPos);
        },
        reorder: function(oldPosition, newPosition){
            var id = this.model.id;

            var silent = {silent:true};

            this.model.collection.chain()
            .select(function(model){
                return model.id != id;
            })
            .each(function(model, index, list){
                model.set({ position: index + 1}, silent);
            });

            this.model.collection.chain()
            .select(function(model){
                return model.id != id && model.get('position') >= newPosition;
            })
            .each(function(model, index, list){
                model.set({ position: model.get('position') + 1}, silent);
            });

            this.model.set({ position: newPosition}, silent);

            this.model.collection.each(function(model){
                model.trigger('change:position', model);
            });

            this.model.collection.sort();
        },
        render: function() {
            var json = this.model.toJSON();
            json.positionString = this.section.get('position') + '.' + this.group.get('position') + '.' + this.model.get('position');

            this.$el.html(this.template(json));
            return this;
        }
    });
});