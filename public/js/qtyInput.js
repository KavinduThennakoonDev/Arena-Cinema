var QtyInput = (function () {
  var $qtyInputs = $(".qty-input");

  if (!$qtyInputs.length) {
    return;
  }

  var $inputs = $qtyInputs.find(".product-qty");
  var $countBtn = $qtyInputs.find(".qty-count");
  var qtyMin = parseInt($inputs.attr("min"));
  var qtyMax = parseInt($inputs.attr("max"));

  $inputs.change(function () {
    var $this = $(this);
    var $minusBtn = $this.siblings(".qty-count--minus");
    var $addBtn = $this.siblings(".qty-count--add");
    var qty = parseInt($this.val());

    if (isNaN(qty) || qty <= qtyMin) {
      $this.val(qtyMin);
      $minusBtn.attr("disabled", true);
    } else {
      $minusBtn.attr("disabled", false);

      if (qty >= qtyMax) {
        $this.val(qtyMax);
        $addBtn.attr("disabled", true);
      } else {
        $this.val(qty);
        $addBtn.attr("disabled", false);
      }
    }
  });

  $countBtn.click(function () {
    var operator = this.dataset.action;
    var $this = $(this);
    var $input = $this.siblings(".product-qty");
    var qty = parseInt($input.val());

    if (operator == "add") {
      qty += 1;
      if (qty >= qtyMin + 1) {
        $this.siblings(".qty-count--minus").attr("disabled", false);
      }

      if (qty >= qtyMax) {
        $this.attr("disabled", true);
      }
    } else {
      qty = qty <= qtyMin ? qtyMin : (qty -= 1);

      if (qty == qtyMin) {
        $this.attr("disabled", true);
      }

      if (qty < qtyMax) {
        $this.siblings(".qty-count--add").attr("disabled", false);
      }
    }

    $input.val(qty);
  });
})();

const prices = {
  odc: {
    half: 400,
    full: 600,
  },
  balcony: {
    half: 700,
    full: 1000,
  },
};

function increaseCount(a, b, availableCountId) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  var odcHalf = document.getElementById(availableCountId);
  var totalPrice = document.getElementById("total-price");

  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
  var pTagValue = parseInt(odcHalf.innerText, 10);
  if (!isNaN(pTagValue)) {
    pTagValue--;
    odcHalf.innerText = `${pTagValue} available`;
  }

  var seatType = availableCountId.split("-")[0];
  var seatSize = availableCountId.split("-")[1];

  var price =
    prices[seatType][seatSize] + parseInt(totalPrice.innerText.split(" ")[1]);
  totalPrice.innerText = `LKR ${price.toString()}.00`;
}
function decreaseCount(a, b, availableCountId) {
  var odcHalf = document.getElementById(availableCountId);
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  var totalPrice = document.getElementById("total-price");

  if (value > 0) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
    var pTagValue = parseInt(odcHalf.innerText, 10);
    if (value >= 0) {
      if (!isNaN(pTagValue)) {
        pTagValue++;
        odcHalf.innerText = `${pTagValue} Available`;
      }

      var seatType = availableCountId.split("-")[0];
      var seatSize = availableCountId.split("-")[1];

      var price =
        parseInt(totalPrice.innerText.split(" ")[1]) -
        prices[seatType][seatSize];
      totalPrice.innerText = `LKR ${price.toString()}.00`;
    }
  }
}
