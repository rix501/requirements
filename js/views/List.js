define([
    'views/Group',
    'views/EditGroup',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min',
    'order!vendor/backbone.min',
    'vendor/mustache'
],
function(GroupView, EditGroupView) {
    return Backbone.View.extend({
        events: {
            "click .create-group": "create",
            "keypress .group-title"  : "updateOnEnter",
            "keyup .search-all"  : "search"
        },
        template: Mustache.compile($("#list-template").html()),
        initialize: function() {
            _.bindAll(this, 'render', 'add', 'addAll', 'create');

            this.collection.bind('reset', this.addAll, this);
            this.collection.bind('add', this.add, this);
            this.collection.bind('destroy', this.render, this);

            this.sectionId = this.options.sectionId;
            this.section = this.options.section;
        },
        add: function(reqsGroup){
            var listView = new GroupView({
                model: reqsGroup,
                section: this.section
            });
            this.$('#groups').append(listView.render().el);
        },
        addAll: function(){
            this.collection.each(this.add);
        },
        create: function(){
            var editGroupView = new EditGroupView({
                collection: this.collection,
                section: this.section
            });
            editGroupView.render();

            return false;
        },
        updateOnEnter: function(event){
            if (event.keyCode == 13) this.create();
        },
        search: function(event){
            var letters = this.$(".search-all").val();
            this.renderList(this.collection.search(letters));
        },
        renderList : function(reqsGroups){
            this.$('#groups').html('');
     
            reqsGroups.each(this.add);

            return this;
        },
        render: function() {
            this.$el.html(this.template());
            
            this.input = this.$el.find(".group-title");

            this.collection.fetch({
                conditions: { sectionId: this.sectionId }
            });

            return this;
        }
    });
});