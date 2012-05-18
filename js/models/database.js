define({  
    id: 'requisita-db',
    description: 'Offline db for Requisita',
    migrations : [
        {
            version: 1,
            migrate: function (transaction, next) {
                var projects = transaction.db.createObjectStore('reqs-projects-store', { keyPath: 'id' });

                var sections = transaction.db.createObjectStore('reqs-sections-store', { keyPath: 'id' });
                sections.createIndex('projectId', 'projectId', { unique: false });

                var groups = transaction.db.createObjectStore('reqs-group-store', { keyPath: 'id' });
                groups.createIndex('sectionId', 'sectionId', { unique: false });

                var reqs = transaction.db.createObjectStore('reqs-store', { keyPath: 'id' });
                reqs.createIndex('groupId', 'groupId', { unique: false });

                next();
            }
        },
        {
            version: 11,
            migrate: function (transaction, next) {
                transaction.db.deleteObjectStore('reqs-projects-store');
                var projects = transaction.db.createObjectStore('reqs-projects-store', { keyPath: 'id' });

                transaction.db.deleteObjectStore('reqs-sections-store');
                var sections = transaction.db.createObjectStore('reqs-sections-store', { keyPath: 'id' });
                sections.createIndex('projectId', 'projectId', { unique: false });

                transaction.db.deleteObjectStore('reqs-group-store');
                var groups = transaction.db.createObjectStore('reqs-group-store', { keyPath: 'id' });
                groups.createIndex('sectionId', 'sectionId', { unique: false });

                transaction.db.deleteObjectStore('reqs-store');
                var reqs = transaction.db.createObjectStore('reqs-store', { keyPath: 'id' });
                reqs.createIndex('groupId', 'groupId', { unique: false });

                next();
            }
        }
    ]
});