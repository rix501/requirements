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
            "sortstop": "see",
            "sortreceive": "saw"
        },
        template: _.template($("#item-template").html()),
        tagName: 'li',
        className: 'req-item',
        initialize: function() {
            _.bindAll(this, 'render', 'edit', 'reorder', 'see', 'saw', 'sup');

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
        see: function(event, ui){
            //Let's get new position
            var newPos = ui.item.parent().children('li').index(ui.item[0]) + 1;
            var oldPos = this.model.get('position');

            this.sup(oldPos, newPos);
        },
        saw: function(event, ui, model){
            this.model.collection.remove(this.model);
            model.get('reqs').add(this.model);
            this.model.set({groupId: model.id});
            this.group = model;
            this.render();

            this.see(event, ui);
        },
        sup: function(oldPosition, newPosition){
            var id = this.model.id;

            this.model.collection.chain()
            .select(function(model){
                return model.id != id;
            })
            .each(function(model, index, list){
                model.set({ position: index + 1});
            });

            this.model.collection.chain()
            .select(function(model){
                return model.id != id && model.get('position') >= newPosition;
            })
            .each(function(model, index, list){
                model.set({ position: model.get('position') + 1});
            });

            this.model.set({ position: newPosition});

            this.model.collection.sort();
        },
        reorder: function(newPosition){
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