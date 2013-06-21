var LoginView;

LoginView = Backbone.View.extend({
    el:'#logintt',
    initialize: function(){
        'use strict';
        var self, loginButton;

        self = this;
        loginButton = $('#loginButton');

        function onLoginClick(e){
            e.preventDefault();
            self.$el.fadeToggle();
        }

        loginButton.on('click', onLoginClick);
    }
});
