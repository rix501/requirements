define([
    'jquery',
    'views/Group',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min'
], 
function($, GroupView) {  
    return Backbone.View.extend({
        events: {
            "click .create-group": "create",
            "keypress .group-title"  : "updateOnEnter",
            "keyup .search-all"  : "search"
        },
        template: _.template($("#list-template").html()),
        initialize: function() {
            _.bindAll(this, 'render', 'add', 'addAll', 'create');

            this.collection.bind('reset', this.addAll, this);
            this.collection.bind('add', this.add, this);

            this.sectionId = this.options.sectionId;
        },
        add: function(reqsGroup){
            var listView = new GroupView({
                model: reqsGroup
            });
            this.$('#groups').append(listView.render().el);
        },
        addAll: function(){
            this.collection.each(this.add);
        },
        create: function(){
            if (!this.input.val()) return;
       
            this.collection.create({
                title: this.input.val(),
                groupId: this.sectionId + '.' + (this.collection.length + 1)
            });

            this.input.val('');
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

            this.collection.fetch(); 

            return this;
        }
    });
});