$(document).ready(function () {

});

$("#inv-submit").on("click", function(event) {
  event.preventDefault();

  var product = $("#product").val();
  var stock = $("#stock").val();

  var newInv = {
    productName: product,
    onHand: stock
  }

  $.ajax({
    url: "api/inventory",
    method: "POST",
    data: newInv
  }).then(function(res) {
    console.log(newInv)
  })
})