//All global variables
var hourOfOperation = ['6:00am: ', '7:00am: ', '8:00am: ', '9:00am: ', '10:00am: ', '11:00am: ', '12:00pm: ', '1:00pm: ', '2:00pm: ', '3:00pm: ', '4:00pm: ', '5:00pm: ', '6:00pm: ', '7:00pm: ', '8:00pm: '];
var objectList = [];
var submitButton = document.getElementById('coffeeForm'); //Strange. This upsetifies me.
var baristaSection = document.getElementById('baristaTable'); //Grabs section
var beanSection = document.getElementById('beanTable'); //Grabs section

baristaHourlyTotals = [];
baristaDailyTotals = [];
companyBaristaDailyTotal = 0;
//Constructor Funtion
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

Locations.prototype.updateObjectList = function () {
  objectList.push(this);
};

Locations.prototype.allCalcs = function() {
  this.calculateCustomerTraffic(this.minCustomersHour, this.maxCustomersHour);
  this.hourlyToGoBeansTotal();
  this.hourlyCupTotal();
  this.updateObjectList();
};

//Creates all coffee stores
var pikePlace = new Locations ('Pike Place', 14, 35, 1.2, .34);
var capitolHill = new Locations ('Capitol Hill', 12, 28, 3.2, .03);
var seattlePublicLibrary = new Locations ('Seattle Public Library', 9, 45, 2.6, .02);
var southLakeUnion = new Locations ('South Lake Union', 5, 18, 1.3, .04);
var seaTacAirport = new Locations ('Sea-Tac Airport', 28, 44, 1.1, .41);

//Runs allCalcs method on these instances to calc daily demand projections
pikePlace.allCalcs();
capitolHill.allCalcs();
seattlePublicLibrary.allCalcs();
southLakeUnion.allCalcs();
seaTacAirport.allCalcs();

//Render current two tables
var createBaristaTable = function () {


  var baristaTable = document.createElement('table'); // Creates table
  baristaSection.appendChild(baristaTable); // Appends table to section

  var baristaTableHeader = function () {
    var timeRow = document.createElement('tr');
    var emptyHead = document.createElement('th');
    timeRow.appendChild(emptyHead);
    var dailyLocationTotal = document.createElement('th');
    dailyLocationTotal.textContent = 'Daily Location Total';
    timeRow.appendChild(dailyLocationTotal);
    baristaTable.appendChild(timeRow); // Appends the table row to the table

    for (var i = 0; i < hourOfOperation.length; i++) {
      var times = document.createElement('th');
      times.textContent = hourOfOperation[i];
      timeRow.appendChild(times); // Appends the header element to the table row
    };
  };
  baristaTableHeader();

  var baristaTableData = function () {
    for (var i = 0; i < hourOfOperation.length; i++) { // Zeros out baristaArray
      baristaHourlyTotals.push(0);
    }
    for (var i = 0; i < objectList.length; i++) {
      baristaDailyTotals.push(0);
    }
    for (var i = 0; i < objectList.length; i++) {
      var baristaRow = document.createElement('tr'); //Creates new row
      var baristaLocation = document.createElement('td'); //Creates new td
      baristaLocation.textContent = objectList[i].locationName; //Gives td locationName
      baristaRow.appendChild(baristaLocation); //Appends td to new row
      var dailyTotal = document.createElement('td'); //Creates baristaDailyTotal
      baristaRow.appendChild(dailyTotal);
      baristaTable.appendChild(baristaRow);
      for (var j = 0; j < hourOfOperation.length; j++) {
        var objectHolder = objectList[i]; //Brings in pikePlace instance
        var baristaNums = document.createElement('td'); //Creates new td
        baristaNums.textContent = objectHolder.employeesNeededPerHour[j]; //Puts baristaNums into td element
        baristaHourlyTotals[j] += parseInt(baristaNums.textContent);
        baristaDailyTotals[i] += parseInt(baristaNums.textContent);
        baristaRow.appendChild(baristaNums); //Appends the td to the row
      }
      dailyTotal.textContent = baristaDailyTotals[i];
    }
  };
  baristaTableData();

  var baristaTableFooter = function () {
    var totalsRow = document.createElement('tr');
    totalsRow.setAttribute('id', 'totalsRow');
    var total = document.createElement('td');
    var companyTotal = document.createElement('td');
    for (i = 0; i < baristaDailyTotals.length; i++) {
      companyBaristaDailyTotal += baristaDailyTotals[i];
    }
    total.textContent = 'Totals:';
    totalsRow.appendChild(total);
    companyTotal.textContent = companyBaristaDailyTotal;
    totalsRow.appendChild(companyTotal);
    baristaTable.appendChild(totalsRow);

    //Populates the totals row from the baristaHourlyTotals array
    for (var i = 0; i < hourOfOperation.length; i++) {
      var total = document.createElement('td');
      total.textContent = baristaHourlyTotals[i];
      totalsRow.appendChild(total);
    };
  };
  baristaTableFooter();
};
createBaristaTable();
console.log(baristaSection);

var createBeanTable = function () {
  beanHourlyTotals = [];
  beanDailyTotals = [];
  companyBeanDailyTotal = 0;

  var beanTable = document.createElement('table'); // Creates table
  beanSection.appendChild(beanTable); // Appends table to section

  var beanTableHeader = function () {
    var timeRow = document.createElement('tr');
    var emptyHead = document.createElement('th');
    timeRow.appendChild(emptyHead);
    var dailyLocationTotal = document.createElement('th');
    dailyLocationTotal.textContent = 'Daily Location Total';
    timeRow.appendChild(dailyLocationTotal);
    beanTable.appendChild(timeRow); // Appends the table row to the table

    for (var i = 0; i < hourOfOperation.length; i++) {
      var times = document.createElement('th');
      times.textContent = hourOfOperation[i];
      timeRow.appendChild(times); // Appends the header element to the table row
    };
  };
  beanTableHeader();

  var beanTableData = function () {
    for (var i = 0; i < hourOfOperation.length; i++) { // Zeros out baristaArray
      beanHourlyTotals.push(0);
    }
    for (var i = 0; i < objectList.length; i++) {
      beanDailyTotals.push(0);
    }
    //prob going to have to zero an array
    for (var i = 0; i < objectList.length; i++) {
      var beanRow = document.createElement('tr'); //Creates new row
      var beanLocation = document.createElement('td'); //Creates new td
      beanLocation.textContent = objectList[i].locationName; //Gives td locationName
      beanRow.appendChild(beanLocation); //Appends td to new row
      var dailyTotal = document.createElement('td'); //Creates baristaDailyTotal
      //
      beanRow.appendChild(dailyTotal);
      beanTable.appendChild(beanRow);
      for (var j = 0; j < hourOfOperation.length; j++) {
        var objectHolder = objectList[i]; //Brings in pikePlace instance
        var beanNums = document.createElement('td'); //Creates new td
        beanNums.textContent = Math.ceil(objectHolder.toGoBeansPerHour[j]); //Puts beanNums into td element
        beanHourlyTotals[j] += parseInt(beanNums.textContent);
        beanDailyTotals[i] += parseInt(beanNums.textContent);
        beanRow.appendChild(beanNums); //Appends the td to the row
      }
      dailyTotal.textContent = beanDailyTotals[i];
    }
  };
  beanTableData();

  var beanTableFooter = function () {
    var totalsRow = document.createElement('tr');
    var total = document.createElement('td');
    var companyTotal = document.createElement('td');
    for (i = 0; i < beanDailyTotals.length; i++) {
      companyBeanDailyTotal += beanDailyTotals[i];
    }
    total.textContent = 'Totals:';
    totalsRow.appendChild(total);
    companyTotal.textContent = companyBeanDailyTotal;
    totalsRow.appendChild(companyTotal);
    beanTable.appendChild(totalsRow);

    //Populates the totals row from the beanHourlyTotals array
    for (var i = 0; i < hourOfOperation.length; i++) {
      var total = document.createElement('td');
      total.textContent = beanHourlyTotals[i];
      totalsRow.appendChild(total);
    };
  };
  beanTableFooter();
};
createBeanTable();
console.log(beanSection);

//Declare an event listener
submitButton.addEventListener('submit', createNewStore);

//Submit Event Handler. Takes in form field data and renders two tables.
function createNewStore(event) {
  event.preventDefault();
  // baristaSection.textContent = '';
  // baristaSection = document.getElementById('baristaTable');
  // beanSection.textContent = '';
  // beanSection = document.getElementById('beanTable');

  if (!event.target.locationName.value || !event.target.minCustomersHour.value || !event.target.maxCustomersHour.value || !event.target.cupsPerCustomer.value || !event.target.lbsPerCustomerToGoBeans.value) {
    return alert('Please complete all fields');
  }

  var locationName = event.target.locationName.value; // For a number = parseInt(event.target.who.value);
  var minCustomersHour = parseInt(event.target.minCustomersHour.value);
  var maxCustomersHour = parseInt(event.target.maxCustomersHour.value);
  var cupsPerCustomer = parseInt(event.target.cupsPerCustomer.value);
  var lbsPerCustomerToGoBeans = parseInt(event.target.lbsPerCustomerToGoBeans.value);

  var newStore = new Locations (locationName, minCustomersHour, maxCustomersHour, cupsPerCustomer, lbsPerCustomerToGoBeans);
  newStore.allCalcs();
  console.log();

  //Clear foot row
  var clearFooter = document.getElementById('totalsRow');
  clearFooter.textContent = '';
  var baristaRow = document.createElement('tr'); //Creates new row
  var baristaLocation = document.createElement('td'); //Creates new td
  baristaLocation.textContent = event.target.locationName.value; //Gives td locationName
  baristaRow.appendChild(baristaLocation); //Appends td to new row
  var dailyTotal = document.createElement('td'); //Creates baristaDailyTotal
  baristaRow.appendChild(dailyTotal);
  baristaTable.appendChild(baristaRow);
  for (var j = 0; j < hourOfOperation.length; j++) {
    // var objectHolder = objectList[i]; //Brings in pikePlace instance
    var baristaNums = document.createElement('td'); //Creates new td
    baristaNums.textContent = objectList[objectList.length-1].employeesNeededPerHour[j]; //Puts baristaNums into td element
    baristaHourlyTotals[j] += parseInt(baristaNums.textContent);
    baristaDailyTotals[i] += parseInt(baristaNums.textContent);
    baristaRow.appendChild(baristaNums); //Appends the td to the row
  }
  dailyTotal.textContent = baristaDailyTotals[i];
  baristaTableFooter();



  console.log('User just created new store ' + event.target.locationName.value);

  //Resets all form fields
  event.target.locationName.value = null;
  event.target.minCustomersHour.value = null;
  event.target.maxCustomersHour.value = null;
  event.target.cupsPerCustomer.value = null;
  event.target.lbsPerCustomerToGoBeans.value = null;
};


// This script needs to draw two tables based on predeclared objects
// Modify event handler to just add rows to clear totals footer
// Build the new row
// Run the footer function
