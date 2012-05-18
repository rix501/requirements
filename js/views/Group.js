define([
    'views/EditItem',
    'views/Item',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min'
], 
function(EditItemView, ItemView) {  
    return Backbone.View.extend({
        events: {
            "click h2" : "toggleList",
            "click button": "create",
            "keyup .search"  : "search"
        },
        template: _.template($("#group-template").html()),
        className: "reqgroup",
        initialize: function() {
            _.bindAll(this, 'render', 'add', 'addAll', 'create');

            this.collection = this.model.get('reqs');
            this.collection.bind('add', this.add, this);
            this.collection.bind('reset', this.addAll, this);
            this.collection.bind('all', this.render, this);

            this.title = this.model.get('title');
            this.groupId = this.model.get('groupId');

            this.collection.fetch({
                conditions: { groupId: this.groupId }
            });
        },
        add: function(req){
            var view = new ItemView({model: req});
            this.$("ul.reqs").append(view.render().el);
        },
        addAll: function(){
            this.collection.each(this.add);
        },
        create: function(){
            var editItemView = new EditItemView({
                collection: this.collection,
                groupId: this.model.id
            });
            editItemView.render();

            return;
        },
        search: function(event){
            var letters = this.$(".search").val();
            this.renderList(this.model.search(letters));
        },
        toggleList: function(){
            this.$('ul.reqs').toggle();
            this.$('.btn').toggle();
            this.$('.search').toggle();
            this.$('.count').toggle();
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
            this.addAll();

            return this;
        }
    });
});