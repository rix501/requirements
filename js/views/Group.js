define([
    'views/EditItem',
    'views/EditGroup',
    'views/Item',
    'order!vendor/jquery.min',
    'order!vendor/jquery.ui.min',
    'order!vendor/underscore.min',
    'order!vendor/backbone.min'
],
function(EditItemView, EditGroupView, ItemView) {
    return Backbone.View.extend({
        events: {
            "click .group-title" : "toggleList",
            "click button": "create",
            "click .edit": "edit",
            "keyup .search"  : "search"
        },
        template: _.template($("#group-template").html()),
        className: "reqgroup",
        initialize: function() {
            _.bindAll(this, 'render', 'add', 'addAll', 'create', 'received', 'stop', 'edit');

            this.collection = this.model.get('reqs');
            this.collection.bind('add', this.add, this);
            this.collection.bind('reset', this.addAll, this);
            this.collection.bind('all', this.render, this);

            this.title = this.model.get('title');
            this.groupId = this.model.id;

            this.section = this.options.section;

            this.collection.fetch({
                conditions: { groupId: this.groupId }
            });
        },
        add: function(req){
            var view = new ItemView({
                model: req,
                section: this.section,
                group: this.model
            });
            this.$("ul.reqs").append(view.render().el);
        },
        addAll: function(){
            this.collection.each(this.add);
        },
        create: function(){
            var editItemView = new EditItemView({
                collection: this.collection,
                groupId: this.model.id,
                section: this.section,
                group: this.model
            });
            editItemView.render();

            return false;
        },
        edit: function(){
            var editGroupView = new EditGroupView({
                model: this.model,
                section: this.section
            });
            editGroupView.render();
        },
        stop: function(event, ui){
            ui.item.trigger('sortstop', ui);
        },
        received: function(event, ui){
            ui.item.trigger('sortreceive', [ ui, this.model ]);
        },
        search: function(event){
            var letters = this.$(".search").val();
            this.renderList(this.model.search(letters));
        },
        toggle: function(selector){
            var hiddenClass = 'hidden';
            if(this.$(selector).hasClass(hiddenClass)){
                this.$(selector).removeClass(hiddenClass);
            }
            else{
                this.$(selector).addClass(hiddenClass);
            }
        },
        toggleList: function(){
            this.toggle('ul.reqs');
            this.toggle('.btn');
            this.toggle('.search');
            this.toggle('.group-count');
        },
        renderList : function(reqs){
            this.$("ul.reqs").html('');
     
            reqs.each(this.add);

            return this;
        },
        render: function() {
            this.$el.html(this.template({
                title: this.title,
                count: this.collection.length
            }));

            this.$("ul.reqs")
                .sortable({
                    connectWith: 'ul.reqs',
                    receive: this.received,
                    stop: this.stop
                })
                .disableSelection();

            this.addAll();

            return this;
        }
    });
});