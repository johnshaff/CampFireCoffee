<table>
  <tr>
    <th>Name</th>
    <th>Color</th>
    <th>Tail</th>
  </tr>

<tr>
  <th>Name</th>
  <th>Color</th>
  <th>Tail</th>
</tr>

</table>



// var catTable = document.getElementById('cats');
// var trElement = document.createElement('tr');
//
// var thElement = document.createElement('th');
// thElement.textContent = 'Name';
// trElement.appendChild(thElement);
//
// var thElement = document.createElement('th');
// thElement.textContent = 'Color';
// trElement.appendChild(thElement);
//
// var thElement = document.createElement('th');
// thElement.textContent = 'Tail';
// trElement.appendChild(thElement);



var catTable = document.getElementById('cats');
var trElement = document.createElement('tr');
var headings = ['Name', 'Color', 'Tail']

for (var i = 0; i < headings.length; i++) {
  var thElement = document.createElement('th');
  thElement.textContent = headings[i]
  trElement.appendChild(thElement);
}
