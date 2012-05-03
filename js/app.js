$(function(){

    var Requirement = Backbone.Model.extend({
        initialize: function() {
            if (!this.get("comments")) {
                this.set({"comments": ''});
                this.set({"commentsMD": ''});
            }
        } 
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
        events: {
            "dblclick" : "edit"
        },
        template: _.template($("#item-template").html()),
        tagName: 'li',
        className: 'req-item',
        initialize: function() {
            _.bindAll(this, 'render', 'edit');

            this.model.bind('change', this.render, this);
        },
        edit: function(){
            var modal = _.template($("#edit-item-template").html());
            var $modal = $(modal(this.model.toJSON()));

            $modal.on('hidden', function () {
                $modal.remove();
            });

            $modal.find('.save').on('click', _.bind(function(){
                var attrs = {
                    title: $modal.find('#edit-title').val(),
                    comments: $modal.find('#edit-comments').val(),
                    commentsMD: markdown.toHTML( $modal.find('#edit-comments').val() )
                }

                this.model.save(attrs, {
                    success: function(){
                        $modal.modal('hide');
                    }
                });
            }, this));

            $modal.modal('show');
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
            _.bindAll(this, 'render', 'add', 'addAll', 'create');

            this.collection = this.options.reqsGroup.get('reqs');
            this.collection.bind('add', this.add, this);
            this.collection.bind('reset', this.addAll, this);

            this.title = this.options.reqsGroup.get('title');
            this.groupId = this.options.reqsGroup.get('groupId');
        },
        add: function(req){
            var view = new ItemView({model: req});
            this.$("ul.reqs").append(view.render().el);
        },
        addAll: function(){
            this.collection.each(this.add);
        },
        create: function(){
            if (!this.input.val()) return;

            this.collection.create({
                title: this.input.val(),
                reqId: this.groupId + '.1.' + (this.collection.length + 1),
                comments: this.comments.val(),
                commentsMD: markdown.toHTML(this.comments.val())
            });

            this.input.val('');
            this.comments.val('');
        },
        render: function() {
            this.$el.html(this.template({title: this.title}));
            this.input = this.$el.find("#title");
            this.comments = this.$el.find("#comments");

            this.collection.fetch();

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
            _.bindAll(this, 'render', 'add', 'addAll', 'create');

            this.reqsGroups = new RequirementsGroups();

            this.reqsGroups.bind('reset', this.addAll, this);
            this.reqsGroups.bind('add', this.add, this);
        },
        add: function(reqsGroup){
            var listView = new ListView({
                reqsGroup: reqsGroup
            });
            this.$('#content').append(listView.render().el);
        },
        addAll: function(){
            this.reqsGroups.each(this.add);
        },
        create: function(){
            if (!this.input.val()) return;
       
            this.reqsGroups.create({
                title: this.input.val(),
                groupId: '1.' + (this.reqsGroups.length + 1)
            });

            this.input.val('');
        },
        render: function() {
            this.$el.html(this.template());
            
            this.input = this.$el.find("#group-title");

            this.reqsGroups.fetch(); 

            return this;
        }
    });

    var pageView = new PageView();
    pageView.render();
});