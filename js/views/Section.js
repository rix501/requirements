define([
    'views/List',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min',
    'order!vendor/backbone.min'
],
function(ListView) {
    return Backbone.View.extend({
        events: {
            'click .section' : 'switchList'
        },
        template: _.template($("#section-template").html()),
        tagName: 'li',
        initialize: function() {
            _.bindAll(this, 'render');

            //this.model.bind('change', this.render, this);

            this.collection = this.model.get('reqs-groups');

            this.title = this.model.get('title');
            this.sectionId = this.model.get('sectionId');
        },
        add: function(){
            var listView = new ListView({
                collection: this.collection,
                sectionId: this.model.id,
                section: this.model
            });

            //Its out of scope
            $('.list').html(listView.render().el);
        },
        switchList: function(){
            $('.nav-list li.active').removeClass('active');

            this.$el.addClass('active');

            this.add();

            return false;
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });
});