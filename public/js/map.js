/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 29.7604, lng: -95.3698 },
        zoom: 11
    });
}
