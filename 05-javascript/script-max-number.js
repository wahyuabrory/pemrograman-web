function findMax() {
  var input1 = parseFloat(document.getElementById("input1").value);
  var input2 = parseFloat(document.getElementById("input2").value);
  var input3 = parseFloat(document.getElementById("input3").value);

  var max = Math.max(input1, input2, input3);

  document.getElementById("result").innerHTML = "Angka terbesar adalah: " + max;
}
