//All global variables
var hourOfOperation = ['6:00am: ', '7:00am: ', '8:00am: ', '9:00am: ', '10:00am: ', '11:00am: ', '12:00pm: ', '1:00pm: ', '2:00pm: ', '3:00pm: ', '4:00pm: ', '5:00pm: ', '6:00pm: ', '7:00pm: ', '8:00pm: '];
var locationsList = [];
var objectList = [];
var hourlyEmpTotals = [];
var hourlyBeanTotals = [];

//Constructor Funtion to create new coffee store locations
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
  this.storeWideHourlyEmployeeDemand = [];
};

//Coffee Store object methods
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

Locations.prototype.updateLocationsList = function () {
  locationsList.push(this.locationName);
};

Locations.prototype.updateObjectList = function () {
  objectList.push(this);
};

Locations.prototype.allCalcs = function() {
  this.calculateCustomerTraffic(this.minCustomersHour, this.maxCustomersHour);
  this.hourlyToGoBeansTotal();
  this.hourlyCupTotal();
  this.updateLocationsList();
  this.updateObjectList();
};

//Creates all coffee stores
var pikePlace = new Locations ('Pike Place', 14, 35, 1.2, .34);
var capitolHill = new Locations ('Capitol Hill', 12, 28, 3.2, .03);
var seattlePublicLibrary = new Locations ('Seattle Public Library', 9, 45, 2.6, .02);
var southLakeUnion = new Locations ('South Lake Union', 5, 18, 1.3, .04);
var seaTacAirport = new Locations ('Sea-Tac Airport', 28, 44, 1.1, .41);

//Calls a method for each object that calculates daily demand projections
pikePlace.allCalcs();
capitolHill.allCalcs();
seattlePublicLibrary.allCalcs();
southLakeUnion.allCalcs();
seaTacAirport.allCalcs();

//This section of code creates two tables and populates them with our daily projections
var BodyElement = document.getElementById('Pin'); // Grabs the body element

var baristasTableElement = document.createElement('table'); // Creates a table element for Baristas Demand
BodyElement.appendChild(baristasTableElement);  // Appends Barista Table to the body element

// Builds the Barista Table Header
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
// Populates the Barista Table with hourly Barista Demand by Location
var populateBaristasTable = function () {
  //Location 0
  var tRowForEmployeesNeeded = document.createElement('tr');
  var locationElement = document.createElement('td');
  locationElement.textContent = locationsList[0];
  tRowForEmployeesNeeded.appendChild(locationElement);

  for (var i = 0; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowDataEmployees = document.createElement('td'); // Creates a new peice of table data
    tRowDataEmployees.textContent = pikePlace.employeesNeededPerHour[i]; // Sets the value of that new peice to emps needed
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees); // Appends the new table data to the new table row
    baristasTableElement.appendChild(tRowForEmployeesNeeded); // Appends the new table row to the table
  };
  //Location 1
  var tRowForEmployeesNeeded = document.createElement('tr');
  var locationElement2 = document.createElement('td');
  locationElement2.textContent = locationsList[1];
  tRowForEmployeesNeeded.appendChild(locationElement2);

  for (var i = 0; i < hourOfOperation.length; i++) {
    var tRowDataEmployees = document.createElement('td');
    tRowDataEmployees.textContent = capitolHill.employeesNeededPerHour[i];
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees);
    baristasTableElement.appendChild(tRowForEmployeesNeeded);
  };
  //Location 2
  var tRowForEmployeesNeeded = document.createElement('tr');
  var locationElement3 = document.createElement('td');
  locationElement3.textContent = locationsList[2];
  tRowForEmployeesNeeded.appendChild(locationElement3);

  for (var i = 0; i < hourOfOperation.length; i++) {
    var tRowDataEmployees = document.createElement('td');
    tRowDataEmployees.textContent = seattlePublicLibrary.employeesNeededPerHour[i];
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees);
    baristasTableElement.appendChild(tRowForEmployeesNeeded);
  };
  //Location 3
  var tRowForEmployeesNeeded = document.createElement('tr');
  var locationElement4 = document.createElement('td');
  locationElement4.textContent = locationsList[3];
  tRowForEmployeesNeeded.appendChild(locationElement4);

  for (var i = 0; i < hourOfOperation.length; i++) {
    var tRowDataEmployees = document.createElement('td');
    tRowDataEmployees.textContent = southLakeUnion.employeesNeededPerHour[i];
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees);
    baristasTableElement.appendChild(tRowForEmployeesNeeded);
  };
  //Location 4
  var tRowForEmployeesNeeded = document.createElement('tr');
  var locationElement5 = document.createElement('td');
  locationElement5.textContent = locationsList[4];
  tRowForEmployeesNeeded.appendChild(locationElement5);

  for (var i = 0; i < hourOfOperation.length; i++) {
    var tRowDataEmployees = document.createElement('td');
    tRowDataEmployees.textContent = seaTacAirport.employeesNeededPerHour[i];
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees);
    baristasTableElement.appendChild(tRowForEmployeesNeeded);
  };
  //Builds Totals Row
  var totalsRow = document.createElement('tr');
  var totalsElement = document.createElement('td');
  totalsElement.textContent = 'Totals:';
  totalsRow.appendChild(totalsElement);
  baristasTableElement.appendChild(totalsRow);

  //Builds Totals array
  for (var i = 0; i < hourOfOperation.length; i++) {
    total = pikePlace.employeesNeededPerHour[i] + capitolHill.employeesNeededPerHour[i] + seattlePublicLibrary.employeesNeededPerHour[i] + southLakeUnion.employeesNeededPerHour[i] + seaTacAirport.employeesNeededPerHour[i];
    hourlyEmpTotals.push(total);
  };

  //Populates the totals row from the Totals array
  for (var i = 0; i < hourOfOperation.length; i++) {
    var tRowDataTotal = document.createElement('td');
    tRowDataTotal.textContent = hourlyEmpTotals[i];
    totalsRow.appendChild(tRowDataTotal);
  };
};
populateBaristasTable();

var beansTableElement = document.createElement('table');  // Creates a table element for Coffe Bean Demand
BodyElement.appendChild(beansTableElement);   // Appends Coffee Bean Table to the body element

// Builds the Coffee Bean Table Header
var buildBeansTable = function () {
  var tRowForTimesHeader = document.createElement('tr'); // Creates a new table row
  for (var i = -1; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowWithHeaderTimes = document.createElement('th'); // Creates a new table header element
    tRowWithHeaderTimes.textContent = hourOfOperation[i]; // Sets the value of that new header element to an hour of operation
    tRowForTimesHeader.appendChild(tRowWithHeaderTimes); // Appends the header element to the table row
    beansTableElement.appendChild(tRowForTimesHeader); // Appends the table row to the table
  };
};
buildBeansTable();
// Populates the Coffee Bean Table with hourly Bean Demand by Location
var populateBeansTable = function () {

  //Pike Place Row
  var tRowForBeansNeeded = document.createElement('tr'); // Creates a new table row
  var locationElement = document.createElement('td'); // Creates new table data element
  locationElement.textContent = locationsList[0]; // Fills new table data element
  tRowForBeansNeeded.appendChild(locationElement); // Appends the new table data element to the new row

  for (var i = 0; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowDataBeans = document.createElement('td'); // Creates a new peice of table data
    tRowDataBeans.textContent = pikePlace.totalHourlyBeans[i]; // Sets the value of that new peice to emps needed
    tRowForBeansNeeded.appendChild(tRowDataBeans); // Appends the new table data to the new table row
    beansTableElement.appendChild(tRowForBeansNeeded); // Appends the new table row to the table
  };
  //Capitol Hill Row
  var tRowForBeansNeeded = document.createElement('tr');
  var locationElement2 = document.createElement('td');
  locationElement2.textContent = locationsList[1];
  tRowForBeansNeeded.appendChild(locationElement2);

  for (var i = 0; i < hourOfOperation.length; i++) {
    var tRowDataBeans = document.createElement('td');
    tRowDataBeans.textContent = capitolHill.totalHourlyBeans[i];
    tRowForBeansNeeded.appendChild(tRowDataBeans);
    beansTableElement.appendChild(tRowForBeansNeeded);
  };
  //Seattle Public Library Row
  var tRowForBeansNeeded = document.createElement('tr');
  var locationElement3 = document.createElement('td');
  locationElement3.textContent = locationsList[2];
  tRowForBeansNeeded.appendChild(locationElement3);

  for (var i = 0; i < hourOfOperation.length; i++) {
    var tRowDataBeans = document.createElement('td');
    tRowDataBeans.textContent = seattlePublicLibrary.totalHourlyBeans[i];
    tRowForBeansNeeded.appendChild(tRowDataBeans);
    beansTableElement.appendChild(tRowForBeansNeeded);
  };
  //South Lake Union Row
  var tRowForBeansNeeded = document.createElement('tr');
  var locationElement4 = document.createElement('td');
  locationElement4.textContent = locationsList[3];
  tRowForBeansNeeded.appendChild(locationElement4);

  for (var i = 0; i < hourOfOperation.length; i++) {
    var tRowDataBeans = document.createElement('td');
    tRowDataBeans.textContent = southLakeUnion.totalHourlyBeans[i];
    tRowForBeansNeeded.appendChild(tRowDataBeans);
    beansTableElement.appendChild(tRowForBeansNeeded);
  };
  //Seatac Airport Row
  var tRowForBeansNeeded = document.createElement('tr');
  var locationElement5 = document.createElement('td');
  locationElement5.textContent = locationsList[4];
  tRowForBeansNeeded.appendChild(locationElement5);

  for (var i = 0; i < hourOfOperation.length; i++) {
    var tRowDataBeans = document.createElement('td');
    tRowDataBeans.textContent = seaTacAirport.totalHourlyBeans[i];
    tRowForBeansNeeded.appendChild(tRowDataBeans);
    beansTableElement.appendChild(tRowForBeansNeeded);
  };
  //Builds Totals Row
  var totalsRowBeans = document.createElement('tr'); // creating a new row element
  var totalsElementBeans = document.createElement('td'); // creating a new td element
  totalsElementBeans.textContent = 'Totals:'; // filling it with something
  totalsRowBeans.appendChild(totalsElementBeans);
  beansTableElement.appendChild(totalsRowBeans); // appending it to

  //Builds Totals array
  for (var i = 0; i < hourOfOperation.length; i++) {
    total = pikePlace.employeesNeededPerHour[i] + capitolHill.employeesNeededPerHour[i] + seattlePublicLibrary.employeesNeededPerHour[i] + southLakeUnion.employeesNeededPerHour[i] + seaTacAirport.employeesNeededPerHour[i];
    hourlyBeanTotals.push(total);
  };

  //Populates the totals row from the Totals array
  for (var i = 0; i < hourOfOperation.length; i++) {
    var tRowDataTotalBeans = document.createElement('td');
    tRowDataTotalBeans.textContent = hourlyBeanTotals[i];
    totalsRowBeans.appendChild(tRowDataTotalBeans);
  };
};
populateBeansTable();

// I DROPPED THE MIC HERE
