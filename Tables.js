// Creates a table row for header times, and then populates it with hours of operation
// console.log('Hi');

var hourOfOperation = ['6:00am: ', '7:00am: ', '8:00am: ', '9:00am: ', '10:00am: ', '11:00am: ', '12:00pm: ', '1:00pm: ', '2:00pm: ', '3:00pm: ', '4:00pm: ', '5:00pm: ', '6:00pm: ', '7:00pm: ', '8:00pm: '];

var locationsList = [];

// var employeesNeededPerHour = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

// <body ='Pin'>
//   <section>
//     <tr>
//       <th>
//     <tr>

function Locations (locationName, minCustomersHour, maxCustomersHour, cupsPerCustomer, lbsPerCustomerToGoBeans) {
  this.locationName = locationName;
  this.minCustomersHour = minCustomersHour;
  this.maxCustomersHour = maxCustomersHour;
  this.randomCustomerPerThatHour = [];
  this.totalDailyCustomers = 0;

  this.lbsPerCustomerToGoBeans = lbsPerCustomerToGoBeans;
  this.toGoBeansPerHour = [];
  this.totalDailyToGoBeans = 0;

  this.cupsPerCustomer = cupsPerCustomer;
  this.cupsPerHour = [];
  this.totalDailyCupBeans = 0;   //.0625 lbs of beans per cup of coffee
  this.cupBeansPerHour = [];

  this.totalHourlyBeans = []; // toGoBeansPerHour + (cupsPerHour[i] * .0625)
  this.totalDailyBeans = 0;

  this.totalDailyCups = 0;
  this.employeesNeededPerHour = [];
};

Locations.prototype.calculateCustomerTraffic = function (min, max) {
  for (var i = 0; i < hourOfOperation.length; i++) {
    var customers = Math.floor(Math.random() * (max - min + 1)) + min;
    this.randomCustomerPerThatHour.push(customers);
    this.totalDailyCustomers += customers;
    this.employeesNeededPerHour.push(Math.ceil(customers * 2 / 60));
  };
};

Locations.prototype.hourlyToGoBeansTotal = function () {
  for (var i = 0; i < hourOfOperation.length; i++) {
    var beans = parseFloat((this.randomCustomerPerThatHour[i] * this.lbsPerCustomerToGoBeans).toFixed(1));
    this.toGoBeansPerHour.push(beans);
    this.totalDailyToGoBeans += Math.ceil(beans);
  };
};

Locations.prototype.hourlyCupTotal = function () {
  console.log('Hi');
  for (var i = 0; i < hourOfOperation.length; i++) {
    var cups = parseFloat((this.randomCustomerPerThatHour[i] * this.cupsPerCustomer).toFixed(1));
    this.cupsPerHour.push(cups);
    this.totalDailyCups += Math.ceil(cups);
    this.totalHourlyBeans.push(Math.ceil(this.toGoBeansPerHour[i] + (this.cupsPerHour[i] * .0625)));
    this.cupBeansPerHour.push(this.cupsPerHour[i] * .0625);
    this.totalDailyCupBeans = Math.ceil((this.totalDailyCups * .0625));
    this.totalDailyBeans = Math.ceil(this.totalDailyToGoBeans + this.totalDailyCupBeans);
  };
};

Locations.prototype.updateLocationsList = function() {
  locationsList.push(this.locationName);
};

Locations.prototype.allCalcs = function() {
  this.calculateCustomerTraffic(this.minCustomersHour, this.maxCustomersHour);
  this.hourlyToGoBeansTotal();
  this.hourlyCupTotal();
  this.updateLocationsList();
};

var pikePlace = new Locations ('Pike Place', 14, 35, 1.2, .34);
var capitolHill = new Locations ('Capitol Hill', 12, 28, 3.2, .03);
var seattlePublicLibrary = new Locations ('Seattle Public Library', 9, 45, 2.6, .02);
var southLakeUnion = new Locations ('South Lake Union', 5, 18, 1.3, .04);
var seaTacAirport = new Locations ('Sea-Tac Airport', 28, 44, 1.1, .41);

pikePlace.allCalcs();
capitolHill.allCalcs();
seattlePublicLibrary.allCalcs();
southLakeUnion.allCalcs();
seaTacAirport.allCalcs();

// AND NOW LADIES AND LENTILMEN... WE BUILD TABLES *** START HOUSE TECHNO ***
// This grabs the body element, creates a table element, and then appends the table to the body
// Creates a table row for Pike Place and then populates it with Employee Data
// for (var i = 0; i < locationsList.length; i++)

// body
//  baristasTableElement
//  beansTableElement

var BodyElement = document.getElementById('Pin');

var baristasTableElement = document.createElement('table');
BodyElement.appendChild(baristasTableElement);

var buildBaristasTable = function () {
  var tRowForTimesHeader = document.createElement('tr'); // Creates a new table row
  for (var i = -1; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowWithHeaderTimes = document.createElement('th'); // Creates a new table header element
    tRowWithHeaderTimes.textContent = hourOfOperation[i]; // Sets the value of that new header element to an hour of operation
    tRowForTimesHeader.appendChild(tRowWithHeaderTimes); // Appends the header element to the table row
    baristasTableElement.appendChild(tRowForTimesHeader); // Appends the table row to the table
  };


};
buildBaristasTable();
var populateBaristasTable = function () {
  var tRowForEmployeesNeeded = document.createElement('tr'); // Creates a new table row
  for (var i = -1; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowDataEmployees = document.createElement('td'); // Creates a new peice of table data
    tRowDataEmployees.textContent = pikePlace.employeesNeededPerHour[i]; // Sets the value of that new peice to emps needed
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees); // Appends the new table data to the new table row
    baristasTableElement.appendChild(tRowForEmployeesNeeded); // Appends the new table row to the table
  };

  var tRowForEmployeesNeeded = document.createElement('tr'); // Creates a new table row
  for (var i = -1; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowDataEmployees = document.createElement('td'); // Creates a new peice of table data
    tRowDataEmployees.textContent = capitolHill.employeesNeededPerHour[i]; // Sets the value of that new peice to emps needed
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees); // Appends the new table data to the new table row
    baristasTableElement.appendChild(tRowForEmployeesNeeded); // Appends the new table row to the table
  };

  var tRowForEmployeesNeeded = document.createElement('tr'); // Creates a new table row
  for (var i = -1; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowDataEmployees = document.createElement('td'); // Creates a new peice of table data
    tRowDataEmployees.textContent = seattlePublicLibrary.employeesNeededPerHour[i]; // Sets the value of that new peice to emps needed
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees); // Appends the new table data to the new table row
    baristasTableElement.appendChild(tRowForEmployeesNeeded); // Appends the new table row to the table
  };

  var tRowForEmployeesNeeded = document.createElement('tr'); // Creates a new table row
  for (var i = -1; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowDataEmployees = document.createElement('td'); // Creates a new peice of table data
    tRowDataEmployees.textContent = southLakeUnion.employeesNeededPerHour[i]; // Sets the value of that new peice to emps needed
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees); // Appends the new table data to the new table row
    baristasTableElement.appendChild(tRowForEmployeesNeeded); // Appends the new table row to the table
  };

  var tRowForEmployeesNeeded = document.createElement('tr'); // Creates a new table row
  for (var i = -1; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowDataEmployees = document.createElement('td'); // Creates a new peice of table data
    tRowDataEmployees.textContent = seaTacAirport.employeesNeededPerHour[i]; // Sets the value of that new peice to emps needed
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees); // Appends the new table data to the new table row
    baristasTableElement.appendChild(tRowForEmployeesNeeded); // Appends the new table row to the table
  };
};
populateBaristasTable();

var beansTableElement = document.createElement('table');
BodyElement.appendChild(beansTableElement);

var buildBeansTable = function () {
  var tRowForTimesHeader = document.createElement('tr'); // Creates a new table row
  for (var i = 0; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowWithHeaderTimes = document.createElement('th'); // Creates a new table header element
    tRowWithHeaderTimes.textContent = hourOfOperation[i]; // Sets the value of that new header element to an hour of operation
    tRowForTimesHeader.appendChild(tRowWithHeaderTimes); // Appends the header element to the table row
    beansTableElement.appendChild(tRowForTimesHeader); // Appends the table row to the table
  };
};
buildBeansTable();
var populateBeansTable = function () {
  var tRowForEmployeesNeeded = document.createElement('tr'); // Creates a new table row
  for (var i = 0; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowDataEmployees = document.createElement('td'); // Creates a new peice of table data
    tRowDataEmployees.textContent = pikePlace.totalHourlyBeans[i]; // Sets the value of that new peice to emps needed
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees); // Appends the new table data to the new table row
    beansTableElement.appendChild(tRowForEmployeesNeeded); // Appends the new table row to the table
  };

  var tRowForEmployeesNeeded = document.createElement('tr'); // Creates a new table row
  for (var i = 0; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowDataEmployees = document.createElement('td'); // Creates a new peice of table data
    tRowDataEmployees.textContent = capitolHill.totalHourlyBeans[i]; // Sets the value of that new peice to emps needed
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees); // Appends the new table data to the new table row
    beansTableElement.appendChild(tRowForEmployeesNeeded); // Appends the new table row to the table
  };

  var tRowForEmployeesNeeded = document.createElement('tr'); // Creates a new table row
  for (var i = 0; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowDataEmployees = document.createElement('td'); // Creates a new peice of table data
    tRowDataEmployees.textContent = seattlePublicLibrary.totalHourlyBeans[i]; // Sets the value of that new peice to emps needed
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees); // Appends the new table data to the new table row
    beansTableElement.appendChild(tRowForEmployeesNeeded); // Appends the new table row to the table
  };

  var tRowForEmployeesNeeded = document.createElement('tr'); // Creates a new table row
  for (var i = 0; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowDataEmployees = document.createElement('td'); // Creates a new peice of table data
    tRowDataEmployees.textContent = southLakeUnion.totalHourlyBeans[i]; // Sets the value of that new peice to emps needed
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees); // Appends the new table data to the new table row
    beansTableElement.appendChild(tRowForEmployeesNeeded); // Appends the new table row to the table
  };

  var tRowForEmployeesNeeded = document.createElement('tr'); // Creates a new table row
  for (var i = 0; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowDataEmployees = document.createElement('td'); // Creates a new peice of table data
    tRowDataEmployees.textContent = seaTacAirport.totalHourlyBeans[i]; // Sets the value of that new peice to emps needed
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees); // Appends the new table data to the new table row
    beansTableElement.appendChild(tRowForEmployeesNeeded); // Appends the new table row to the table
  };
};
populateBeansTable();

// I DROPPED THE MIC HERE
