define([
    'models/Requirements',
    'models/RequirementsGroups',
    'models/Sections',
    'text!/css/bootstrap.min.css',
    'text!/css/print.css',
    'order!vendor/jquery.min',
    'order!vendor/underscore.min',
    'order!vendor/backbone.min',
    'vendor/mustache',
    'vendor/FileSaver.min'
],
function(Requirements, RequirementsGroups, Sections, bootstrap, printStyle) {
    return Backbone.View.extend({
        events: {
            'click .print':'print'
        },
        template: Mustache.compile($("#print-preview-requirements-template").html()),
        printTemplate: Mustache.compile($("#print-requirements-template").html()),
        className: 'row-fluid',
        initialize: function() {
            _.bindAll(this, 'render', 'add', 'print');

            this.collection = [];

            this.projectId = this.options.projectId;

            this.requirements = new Requirements();
            this.requirementsGroups = new RequirementsGroups();
            this.sections = new Sections();
            this.project = window.Projects.get(this.projectId);

            this.requirements.bind('reset', this.add, this);
            this.requirementsGroups.bind('reset', this.add, this);
            this.sections.bind('reset', this.add, this);

            this.requirements.fetch({
                conditions: { projectId: this.projectId }
            });
            this.requirementsGroups.fetch({
                conditions: { projectId: this.projectId }
            });
            this.sections.fetch({
                conditions: { projectId: this.projectId }
            });
        },
        add: _.after(3, function(){

            this.sections.each(_.bind(function(section){

                var groups = this.requirementsGroups.chain()
                .select(function(requirementsGroup){
                    return requirementsGroup.get('sectionId') == section.id;
                })
                .map(_.bind(function(requirementsGroup){
                    
                    var reqs = this.requirements.chain()
                    .select(function(requirement){
                        return requirement.get('groupId') == requirementsGroup.id;
                    })
                    .map(_.bind(function(requirement){
                        return {
                            number: section.get('position') + '.' +  requirementsGroup.get('position') + '.' + requirement.get('position'),
                            group: requirementsGroup.get('title'),
                            requirement: requirement.get('title'),
                            comments: requirement.get('commentsMD')
                        };
                    },this))
                    .value();

                    return reqs;
                },this))
                .flatten()
                .value();

                this.collection = this.collection.concat({
                    number: section.get('position'),
                    title: section.get('title'),
                    groups: groups
                });

            }, this));

            this.render();
        }),
        print: function(){
            var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

            var bb = new BlobBuilder();
            bb.append(this.printTemplate({
                _:_,
                collection: this.collection,
                style: {
                    bootstrap: bootstrap,
                    print: printStyle
                }
            }));
            saveAs(bb.getBlob("text/html;charset=utf-8"), this.project.get('title') + "-requirements.html");
        },
        render: function() {
            this.$el.html(this.template({_:_, collection: this.collection}));

            return this;
        }
    });
});