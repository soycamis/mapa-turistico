var MapView;

MapView = Backbone.View.extend({
    el: '#mimapa',
    initialize: function() {
        'use strict';
        this.createMap();
    },
    createMap: function() {
        'use strict';
        var self, tiles;

        self = this;
        tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
        this.map = L.map('mimapa', {
            center: [0, -28],
            zoom: 4
        });

        function onLocationFound(position) {
            self.map.setView(new L.LatLng(position.latlng.lat, position.latlng.lng), 12);
            self.userLocation = {
                lat: position.latlng.lat,
                lng: position.latlng.lng
            };
        }

        function menucontextual(e) {
            $('#menuContextual').css({
                'display': 'block',
                'left': e.containerPoint.x,
                'top': e.containerPoint.y
            });
            app.mcontextual.x = e.containerPoint.x;
            app.mcontextual.y = e.containerPoint.y;
            app.mcontextual.lat = e.latlng.lat;
            app.mcontextual.lng = e.latlng.lng;
        }

        function clickMap() {
            $('#menuContextual').css({
                'display': 'none'
            });
        }

        this.map.addLayer(tiles);
        this.map.locate({
            enableHighAccuracy: true
        });

        this.map.on('locationfound', onLocationFound);
        this.map.on('contextmenu', menucontextual);
        this.map.on('click', clickMap);
    },
    centerMap: function (lat, lng) {
        'use strict';
        this.map.setView(new L.LatLng(lat,lng), 14);
    },
    addMarker: function (city, country, lat, lng, image, name) {
        'use strict';
        var marker, popupOptions, htmlPopup;

        marker = L.marker([lat,lng]);
        this.map.addLayer(marker);
        popupOptions = {
            'minWidth': '300px',
            'maxWidth': '200px'
        };

        htmlPopup = '';
        htmlPopup += '<div id="popupPlace">';
        htmlPopup +='<img src=../../' + image + ' />';
        htmlPopup +='<p id="popupName">' + name + '</p>';
        htmlPopup += '<p><i class="icon-map-marker"></i> ' + city + ', ' + country + '.</p>';
        htmlPopup += '<p id="popupDet"><a href="">Ver mas detalles...</a></p>';
        htmlPopup += '</div>';
        marker.bindPopup(htmlPopup,popupOptions);
    }
});