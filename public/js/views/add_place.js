var AddPlaceView;

var countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo (Brazzaville)',
    'Congo',
    'Costa Rica',
    'Cote d Ivoire',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor (Timor Timur)',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia, The',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea, North',
    'Korea, South',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepa',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia and Montenegro',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe'
];

AddPlaceView = Backbone.View.extend({
    el:'#agregar-sitio',
    initialize: function(){
        'use strict';
        var self, countryPlace, htmlCountries, geolocationOption, nogeolocationOption, $latInput, $lgnInput, $close, $form;

        $latInput = $('#latPlace');
        $lgnInput = $('#lngPlace');
        self = this;
        $form = $('#form-agregar-sitio');
        htmlCountries = '';
        countryPlace = $('#countryPlace');
        geolocationOption = $('#geolocationOption');
        nogeolocationOption = $('#manualOption');
        $close = $('#closeButton');

        function getUserGeolocation() {
            if (app.map.userLocation) {
                $latInput.val(app.map.userLocation.lat);
                $lgnInput.val(app.map.userLocation.lng);
            } else {
                app.map.map.locate({ enableHighAccuracy: true });
                app.map.map.on('locationfound', function() {
                    $latInput.val(app.map.userLocation.lat);
                    $lgnInput.val(app.map.userLocation.lng);
                });
            }
        }

        function onSubmitForm(e) {
            e.preventDefault();
            $(this).ajaxSubmit({
                success: function() {
                    app.places.fetch({
                        success: function(collection){
                            app.sidebar.addPlaces(collection);
                        }
                    });
                }
            });
            self.$el.fadeOut('fast');
            self.reset();
            $('input[type=radio]').attr('disabled', false);
            $('input[type=radio]').attr('checked', false);
            $('#coords').hide();
            alertify.success('Lugar agregado exitosamente.');
        }

        function onClickClose(e) {
            e.preventDefault();
            self.$el.fadeOut('fast');
        }

        _.each(countries, function(country) {
            htmlCountries += '<option value="' + country + '">' + country + '</option>';
        });
        countryPlace.append(htmlCountries);

        geolocationOption.on('click', getUserGeolocation);
        nogeolocationOption.on('click', function() {
            alertify.alert('Pincha en el mapa para localizar el sitio y agregar su ubicacion.');
            self.$el.fadeOut('fast');
        });

        $form.on('submit', onSubmitForm);
        $close.on('click', onClickClose);
    }
});