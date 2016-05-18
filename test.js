// <table>
//   <tr>
//     <th>Name</th>
//     <th>Color</th>
//     <th>Tail</th>
//   </tr>
//
// <tr>
//   <th>Name</th>
//   <th>Color</th>
//   <th>Tail</th>
// </tr>
//
// </table>

// WET CODE

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

//DRY CODE

var catTable = document.getElementById('cats');
var trElement = document.createElement('tr');
var headings = ['Name', 'Color', 'Tail'];
var buddyCat = ['Buddy', 'Orange', 'Mega'];
var arrayTableContent = [headings, buddyCat];

for (var j = 0; j < arrayTableContent.length; j++) {
  var trElement = document.createElement('tr');
    for (var i = 0; headings.length; i++) {
      var thElement = document.createElement('th');
      thElement.textContent = arrayTableContent[j][i];
      // there should be something here.
  }
}

for (var i = 0; i < headings.length; i++) {
  var thElement = document.createElement('th');
  thElement.textContent = headings[i]
  trElement.appendChild(thElement);
}

catTable.appendChild(trElement);

var trElement = document.createElement('tr')
for (var i = 0; i < headings.length; i++) {
  var thElement = document.createElement('th');
  thElement.textContent = buddyCat[i]
  trElement.appendChild(thElement); // because the value of trElement is an html element, ES knows that appendChild is a method that can place something as a child to another html element.

catTable.appendChild(trElement);

// Creates a table row for header times, and then populates it with hours of operation

var tRowForTimesHeader = document.createElement('tr') // Creating a new row
for (var i = 0; i < employeesNeededPerHour.length; i++) { // setting conditional counter to length of employees needed
  var tRowWithHeaderTimes = document.createElement('th'); // Creating a new header element
  tRowWithHeaderTimes.textContent = hourOfOperation[i]; // Put employee data into the header (need to make 0-index empty)
  tRowForTimesHeader.appendChild(tRowWithHeaderTimes); // Put the header in the row
}

// Creates a table row for Pike Place and then populates it with Employee Data

var tRowForEmployeesNeeded = document.createElement('tr') // Creating a new row
for (var i = 0; i < employeesNeededPerHour.length; i++) { // setting conditional counter to length of employees needed
  var tRowDataEmployees = document.createElement('td'); // Creating a new header element
  tRowDataEmployees.textContent = PikePlace.mployeesNeededPerHour[i]; // Put employee data into the header (need to make 0-index empty)
  tRowDataEmployees.appendChild(tRowForEmployeesNeeded); // Put the header in the row
}




// var mahClass = [];
//
// function Student (firstName, lastInitial, faveNumber) {
//   this.course = '201d7';
//   this.firstName = firstName;
//   this.lastInitial = lastInitial;
//   this.faveNumber = faveNumber;
//   this.isCodeNinja = true;
//   this.intro = function () {
//     console.log('My name is ' + firstName);
//   };
//   mahClass.push(this);
//   console.log(this);
// };
//
// var john = new Student('John');
//
//
//
// CoffeeKiosk.prototype.hourlyCustomerCalc = function(min,max) {
//   for (var i = 0; i < hours.length; i++) {
//     var customers = Math.floor(Math.random() * (max - min + 1) + min);
//     this.hourlyCustArray.push(customers);
//     this.totalDailyCusts += customs;
//   }
// }
//
// makeHederRows
//
// allKiosks[].renderBeans()
// allKiosks[].renderBaristas()
