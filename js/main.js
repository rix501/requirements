require([
    "jquery",
    "app"
], 
function($, Requisita) {
    $(function() {
        // Kick off the application
        window.App = new Requisita();
        Backbone.history.start();       
    });
});