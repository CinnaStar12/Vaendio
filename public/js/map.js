var markersArray = []

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 29.7604, lng: -95.3698 },
    zoom: 11
  });

  var data = [
    {
      lat: 29.680443,
      lng: -95.326996
    },
    {
      lat: 29.756396,
      lng: -95.426851
    },
    {
      lat: 29.785482,
      lng: -95.291478
    },
    {
      lat: 29.717990,
      lng: -95.222786
    },
  ]

  for (var i = 0; i < data.length; i++) {


    var icon = {
      url: "/assets/baseline_storefront_black_18dp.png",
      scaledSize: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0)
    };
    var marker = new google.maps.Marker({
      position: data[i],
      map: map,
      icon: icon,
      index: i
    })

    google.maps.event.addListener(marker, "click", function (marker) {
      $("#overlay").css("display","block")
      console.log("click")
    })
    // replace window content with overlay

    markersArray.push(marker);
  }

}
function closeOverlay(){
  $("#overlay").css("display","none")
}

// $(document).ready(function () {
//   // $.get("/api/vendors").then(function (data) {
//   //   console.log(data);
//   // });
// })
