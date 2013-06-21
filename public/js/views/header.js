var HeaderView;

HeaderView = Backbone.View.extend({
    el: '#header',

    events: {
        'click #addButton': 'showFormAddPlace',
        'click #loginButton': 'showFormLogin'
    },

    showFormAddPlace: function(e) {
        'use strict';
        e.preventDefault();
        $('#agregar-sitio').fadeToggle();

    },

    showFormLogin: function(e) {
        'use strict';
        e.preventDefault();
        $('#logintt').fadeToggle();
    }
});