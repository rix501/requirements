$(function(){

    /** MODELS **/

    var Requirement = Backbone.Model.extend({
        defaults: {
            "title": '',
            "comments": '',
            "commentsMD": ''
        }
    });

    var Requirements = Backbone.Collection.extend({
        model: Requirement
    });

    var RequirementsGroup = Backbone.Model.extend({
        initialize: function() {
            this.set({'reqs': new Requirements()});
            this.get('reqs').localStorage = new Store("reqs-" + this.get('title') + "-store")
        },
        search : function(letters){
            if(letters == "") return this.get('reqs');
     
            var pattern = new RegExp(letters,"gi");
            return _(this.get('reqs').filter(function(req) {
                return pattern.test(req.get("title")) || pattern.test(req.get("comments"));
            }));
        }
    });

    var RequirementsGroups = Backbone.Collection.extend({
        model: RequirementsGroup,
        localStorage: new Store("reqs-group-store"),
        search : function(letters){
            if(letters == "") return this;
     
            var pattern = new RegExp(letters,"gi");
            return _(this.filter(function(reqsGroup) {
                return pattern.test(reqsGroup.get("title")) ||  reqsGroup.search(letters).size() > 0 ;
            }));
        }
    });

    /** VIEWS **/

    var EditItemView = Backbone.View.extend({
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
                    reqId: this.groupId + '.1.' + (this.collection.length + 1)
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

    var ItemView = Backbone.View.extend({
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

    var ListView = Backbone.View.extend({
        events: {
            "click h2" : "toggleList",
            "click button": "create",
            "keyup .search"  : "search"
        },
        template: _.template($("#list-template").html()),
        className: "reqgroup span12",
        initialize: function() {
            _.bindAll(this, 'render', 'add', 'addAll', 'create');

            this.collection = this.model.get('reqs');
            this.collection.bind('add', this.add, this);
            this.collection.bind('reset', this.addAll, this);

            this.title = this.model.get('title');
            this.groupId = this.model.get('groupId');
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
                groupId: this.groupId
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
        },
        renderList : function(reqs){
            this.$("ul.reqs").html('');
     
            reqs.each(this.add);

            return this;
        },
        render: function() {
            this.$el.html(this.template({title: this.title}));
            this.collection.fetch();

            return this;
        }
    });

    var PageView = Backbone.View.extend({
        events: {
            "click .create-group": "create",
            "keypress .group-title"  : "updateOnEnter",
            "keyup .search-all"  : "search"
        },
        template: _.template($("#page-template").html()),
        el: 'body',
        initialize: function() {
            _.bindAll(this, 'render', 'add', 'addAll', 'create');

            this.collection = new RequirementsGroups();

            this.collection.bind('reset', this.addAll, this);
            this.collection.bind('add', this.add, this);
        },
        add: function(reqsGroup){
            var listView = new ListView({
                model: reqsGroup
            });
            this.$('#content').append(listView.render().el);
        },
        addAll: function(){
            this.collection.each(this.add);
        },
        create: function(){
            if (!this.input.val()) return;
       
            this.collection.create({
                title: this.input.val(),
                groupId: '1.' + (this.collection.length + 1)
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
            this.$('#content').html('');
     
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

    var pageView = new PageView();
    pageView.render();
});