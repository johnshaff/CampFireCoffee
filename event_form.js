//All global variables
var hourOfOperation = ['6:00am: ', '7:00am: ', '8:00am: ', '9:00am: ', '10:00am: ', '11:00am: ', '12:00pm: ', '1:00pm: ', '2:00pm: ', '3:00pm: ', '4:00pm: ', '5:00pm: ', '6:00pm: ', '7:00pm: ', '8:00pm: '];
var locationsList = [];
var objectList = [];
var hourlyEmpTotals = [];
var hourlyBeanTotals = [];

var submitButton = document.getElementById('submitButtom');

var appendNewStoreRow = function() {
  for (var i = 0; i < allComments.length; i++) {
    chatList.appendChild(allComments[i].render());
  }

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

//Declare an event listener
submitButton.addEventListener('submit', createNewStore);

//Creates the section element and the Baristas Table 
var SectionElement = document.getElementById('Pin'); // Grabs the section element
var baristasTableElement = document.createElement('table'); // Creates a table element for Baristas Demand
SectionElement.appendChild(baristasTableElement);  // Appends Barista Table to the section element

// Builds the Barista Table Header
var buildBaristasTable = function () {
  var tRowForTimesHeader = document.createElement('tr'); // Creates a new table row
  for (var i = -1; i < hourOfOperation.length; i++) { // Sets conditional counter to the number of operating hours
    var tRowWithHeaderTimes = document.createElement('th'); // Creates a new table header element
    tRowWithHeaderTimes.textContent = hourOfOperation[i]; // Sets the value of that new header element to an hour of operation
    tRowForTimesHeader.appendChild(tRowWithHeaderTimes); // Appends the header element to the table row
    baristasTableElement.appendChild(tRowForTimesHeader); // Appends the table row to the table
  };

//Functions & Logic
function createNewStore(event) {
  console.log(event); // This logs the entire event to the console
  event.preventDefault(); // This prevents my page from reloading

  if (!event.target.locationName.value || !event.target.minCustomersHour.value || !event.target.maxCustomersHour.value || !event.target.cupsPerCustomer.value || !event.target.lbsPerCustomerToGoBeans.value) {
    return alert('Please complete all fields');
  }

  var locationName = event.target.locationName.value; // For a number = parseInt(event.target.who.value);
  var minCustomersHour = event.target.minCustomersHour.value;
  var maxCustomersHour = event.target.maxCustomersHour.value;
  var cupsPerCustomer = event.target.cupsPerCustomer.value;
  var lbsPerCustomerToGoBeans = event.target.lbsPerCustomerToGoBeans.value;

  var newStore = new Locations (locationName, minCustomersHour, maxCustomersHour, cupsPerCustomer, lbsPerCustomerToGoBeans);

  console.log('User just created new store ' + event.target.locationName.value + ' at ' + Date());

  event.target.locationName.value = null;
  event.target.minCustomersHour.value = null;
  event.target.maxCustomersHour.value = null;
  event.target.cupsPerCustomer.value = null;
  event.target.lbsPerCustomerToGoBeans.value = null;

  var newLocationRow = document.createElement('tr');
  var newLocationElement = document.createElement('td');
  newLocationElement.textContent = something[];
  newLocationRow.appendChild(newLocationElement);
  baristasTableElement.appendChild(newLocationElement); // This is why the footer needs to be its own element. I need to append above.

  for (var i = 0; i < hourOfOperation.length; i++) {
    var tRowDataEmployees = document.createElement('td');
    tRowDataEmployees.textContent = seaTacAirport.employeesNeededPerHour[i];
    tRowForEmployeesNeeded.appendChild(tRowDataEmployees);
    baristasTableElement.appendChild(tRowForEmployeesNeeded);
  };

  locationsList.push(newStore);
  appendNewStoreRow();
};


// I want take the input of my form and then create a new instance using that input
// First I have an to create an array from the form input

// var locationName = new Locations (formArray[0], formArray[1], formArray[2], formArray[3], formArray[4])
