
$(document).ready(function () {
  console.log($)

  $("#inv-submit").on("click", function(e) {
    e.preventDefault();

    var product = $("#product").val();
    var stock = $("#stock").val();

    var newInv = {
      productName: product,
      onHand: stock
    }

    $.ajax({
      url: "/api/inventory",
      method: "POST",
      data: newInv
    }).then(function(res) {
      console.log(newInv)
    })
  });

  $("#location-submit").on("click", function(e) {
    e.preventDefault(); 

    var address = $("#inputAddress").val();
    var city = $("#inputCity").val();
    var state = $("#inputState").val();
    console.log(address + city + state)
    var queryUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},${city},${state}&key=`
    console.log(queryUrl)
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function(data) {
      var coord = data.results[0].geometry.location;
      var addressLine = `${address}, ${city}, ${state}`

      var newStorefront = {
        latitude: coord.lat,
        longitude: coord.lng,
        address: addressLine,
      }
      $.ajax({
        url: "/api/storefronts",
        method: "POST",
        data: newStorefront
      }).then((result) => {
        console.log(newStorefront);
        
      })
      
    }
  )})



});
