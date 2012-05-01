$(function(){

    var Requirement = Backbone.Model.extend({

    });

    var Requirements = Backbone.Collection.extend({
        model: Requirement
    });

    var RequirementsGroup = Backbone.Model.extend({
        initialize: function() {
            this.set({'reqs': new Requirements()});
            this.get('reqs').localStorage = new Store("reqs-" + this.get('title') + "-store")
        }
    });

    var RequirementsGroups = Backbone.Collection.extend({
        model: RequirementsGroup,
        localStorage: new Store("reqs-group-store")
    });

    var ItemView = Backbone.View.extend({
        template: _.template($("#item-template").html()),
        tagName: 'li',
        initialize: function() {
            _.bindAll(this, 'render');
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var ListView = Backbone.View.extend({
        events: {
            "click button": "create"
        },
        template: _.template($("#list-template").html()),
        initialize: function() {
            _.bindAll(this, 'render', 'add', 'create');

            this.collection = this.options.reqsGroup.get('reqs');
            this.collection.bind('add', this.add, this);

            this.title = this.options.reqsGroup.get('title');
        },
        add: function(req){
            var view = new ItemView({model: req});
            this.$("ul").append(view.render().el);
        },
        create: function(){
            if (!this.input.val()) return;

            this.collection.create({
                title: this.input.val(),
                reqId: '1.1.1.' + (this.collection.length + 1)
            });
            this.input.val('');
        },
        render: function() {
            this.$el.html(this.template({title: this.title}));
            this.input = this.$el.find("#title");
            return this;
        }
    });

    var PageView = Backbone.View.extend({
        events: {
            "click #create-group": "create"
        },
        template: _.template($("#page-template").html()),
        el: 'body',
        initialize: function() {
            _.bindAll(this, 'render');

            this.reqsGroups = new RequirementsGroups();
        },
        create: function(){
            if (!this.input.val()) return;

            var listView = new ListView({
                reqsGroup: this.reqsGroups.create({title: this.input.val()})
            });
            
            this.$('#content').append(listView.render().el);

            this.input.val('');
        },
        render: function() {
            this.$el.html(this.template());
            
            this.input = this.$el.find("#group-title");

            return this;
        }
    });

    var pageView = new PageView();
    pageView.render();
});