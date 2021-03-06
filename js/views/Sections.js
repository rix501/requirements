define([
    'models/Sections',
    'views/Section',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min',
    'order!vendor/backbone.min',
    'vendor/mustache'
],
function(Sections, SectionView) {
    return Backbone.View.extend({
        events: {
            'click .add-section' : 'edit',
            'keypress .section-title'  : 'editPress',
            'blur .section-title' : 'blured'
        },
        template: Mustache.compile($("#sections-template").html()),
        tagName: 'ul',
        className: 'nav nav-list',
        initialize: function() {
            _.bindAll(this, 'render', 'add', 'addAll', 'edit', 'create');

            this.projectId = this.options.projectId;

            this.collection = window.Projects.get(this.projectId).get('sections');

            this.collection.bind('reset', this.addAll, this);
            this.collection.bind('add', this.add, this);
        },
        blured: function(){
            var input = this.$('.section-title');
            var title = input.val();

            if(title === '') input.remove();
        },
        editPress: function(event){
            if (event.keyCode == 13) this.create();
        },
        edit: function(event){
            if(this.$('.section-title').length > 0) return false;
            
            var input = '<li><input class="section-title row-fluid" name="section-title" type="text"></li>';

            this.$('.divider').before(input);
            return false;
        },
        create: function(){
            var input = this.$('.section-title');
            var title = input.val();
            input.remove();

            if(title !== ''){
                this.collection.create({
                    title: title,
                    position: this.collection.length + 1,
                    projectId: this.projectId
                });
            }
        },
        add: function(section){
            var sectionView = new SectionView({
                model: section
            });
            this.$('.divider').before(sectionView.render().el);
        },
        addAll: function(){
            this.collection.each(this.add);
        },
        render: function() {
            this.$el.html(this.template());
            
            this.collection.fetch({
                conditions: { projectId: this.projectId }
            });

            return this;
        }
    });
});