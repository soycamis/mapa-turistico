var SidebarView;

SidebarView = Backbone.View.extend({
    el: '#placeList',
    events: {
        'click .elemList': 'onClickSidebar'
    },
    addPlaces: function(places) {
        'use strict';
        var htmlPlaces = '';

        _.each(places.toJSON(), function(place){
            htmlPlaces += '<article data-lat="' + place.point.lat + '" data-lng="' + place.point.lng + '" class="elemList" id="' + place._id + '">';
            htmlPlaces += '<figure><div class="thumb"><img src="' + place.image + '" /></div>';
            htmlPlaces += '<figcaption class="caption"><p class="name">' + place.name + '</p>';
            htmlPlaces += '<p class="description">' + place.description.substring(0,80) + '...</p></figcaption></figure>';
            htmlPlaces += '</article>';
            app.map.addMarker(place.city, place.country, place.point.lat, place.point.lng, place.image, place.name);
        });

        this.$el.html(htmlPlaces);
    },
    onClickSidebar: function (param) {
        'use strict';
        var placeId, placeLat, placeLng;

        placeId = param.currentTarget.id;
        placeLat = $('#' + placeId).attr('data-lat');
        placeLng = $('#' + placeId).attr('data-lng');
        app.map.centerMap(placeLat, placeLng);
    }
});