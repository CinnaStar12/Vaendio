var markersArray = []

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 29.7604, lng: -95.3698 },
    zoom: 11
  });
  $.ajax({
    url: "/api/storefronts",
    method: "GET"
  }).then(function (results) {
    console.log(results)
    var data = results

    for (var i = 0; i < data.length; i++) {
      var storefrontId = data[i].id
      var storefrontTitle = data[i].name
      console.log(data[i].latitude)
      var icon = {
        url: "./assets/vendor.png",
        scaledSize: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
      };
      var position = {
        lat: parseFloat(data[i].latitude),
        lng: parseFloat(data[i].longitude)
      }
      console.log(position)
      var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: icon,
        index: i,
      })

      google.maps.event.addListener(marker, "click", function (marker) {
        $("#overlay").css("display", "block")
        var invUrl = "/api/inventory/" + storefrontId
        console.log(invUrl)
        $.ajax({
          url: invUrl,
          method: "GET"
        }).then(function (results) {
          $("#storeTitle").text(`${storefrontTitle}`)
          for (var i = 0; i < results.length; i++) {
            var index = i+1
            $("#tbody").append(`<tr><td>${index}</td><td>${results[i].productName}</td><td>${results[i].price}</td></tr>`)
          }
        })
      })

      markersArray.push(marker);
    }

  })
}

function closeOverlay() {
  $("#overlay").css("display", "none")
}
