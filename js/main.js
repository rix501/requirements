require([
    'app',
    'order!vendor/jquery.min'
],
function(Requisita) {
    $(function() {
        // Kick off the application
        window.App = new Requisita();
        Backbone.history.start();
    });
});