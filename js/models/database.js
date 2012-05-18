define([
    'order!vendor/jquery.min',
    'order!vendor/underscore.min', 
    'order!vendor/backbone.min',
    'order!vendor/backbone.indexeddb'
], 
function() {  
    return {  
        id: 'requisita-db',
        description: 'Offline db for Requisita',
        migrations : [
            {
                version: '2.3',
                migrate: function (transaction, next) {
                    //transaction.db.createObjectStore('reqs-sections-store');
                    //transaction.db.createObjectStore('reqs-store');
                    //transaction.db.createObjectStore('reqs-group-store');
                    next();
                }
            }
        ]
    }
});