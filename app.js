
// '6:00am: 86.5 lbs [23 customers, 27.6 cups (1.4 lbs), 85.1 lbs to-go]'

var hourOfOperation = ['6:00am: ', '7:00am: ', '8:00am: ', '9:00am: ', '10:00am: ', '11:00am: ', '12:00pm: ', '1:00pm: ', '2:00pm: ', '3:00pm: ', '4:00pm: ', '5:00pm: ', '6:00pm: ', '7:00pm: ', '8:00pm: '];

var PikePlace = {
  locationName: 'Pike Place Market',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  randomCustomerPerThatHour: [],
  totalDailyCustomers: 0,

  lbsPerCustomerToGoBeans: 0.34,
  toGoBeansPerHour: [],
  totalDailyToGoBeans: 0,

  cupsPerCustomer: 1.2,
  cupsPerHour: [],
  totalDailyCupBeans: 0,   //.0625 lbs of beans per cup of coffee
  cupBeansPerHour: [],

  totalHourlyBeans: [], // toGoBeansPerHour + (cupsPerHour[i] * .0625)
  totalDailyBeans: 0,

  totalDailyCups: 0,
  employeesNeededPerHour: [],

  calculateCustomerTraffic: function (min, max) {
    for (var i = 0; i < hourOfOperation.length; i++) {
      customersPerHour = Math.floor(Math.random() * (max - min + 1)) + min;
      this.randomCustomerPerThatHour.push(customersPerHour);
      this.totalDailyCustomers += customersPerHour;
      this.employeesNeededPerHour.push(Math.ceil(customersPerHour * 2/60));
    }
  },

  hourlyToGoBeansTotal: function() {
    for (var i = 0; i < hourOfOperation.length; i++) {
      beans = parseFloat((this.randomCustomerPerThatHour[i] * this.lbsPerCustomerToGoBeans).toFixed(1));
      this.toGoBeansPerHour.push(beans);
      this.totalDailyToGoBeans += Math.ceil(beans);
    }
  },

  hourlyCupTotal: function() {
    console.log('Hi');
    for (var i = 0; i < hourOfOperation.length; i++) {
      cups = parseFloat((this.randomCustomerPerThatHour[i] * this.cupsPerCustomer).toFixed(1));
      this.cupsPerHour.push(cups);
      this.totalDailyCups += Math.ceil(cups);
      this.totalHourlyBeans.push(Math.ceil(this.toGoBeansPerHour[i] + (this.cupsPerHour[i] * .0625)));
      this.cupBeansPerHour.push(this.cupsPerHour[i] * .0625);
      this.totalDailyCupBeans = Math.ceil((this.totalDailyCups * .0625));
      this.totalDailyBeans = Math.ceil(this.totalDailyToGoBeans + this.totalDailyCupBeans);
    }
  },

  render: function() {
    PikePlace.calculateCustomerTraffic(PikePlace.minCustomersHour, PikePlace.maxCustomersHour);
    PikePlace.hourlyToGoBeansTotal();
    PikePlace.hourlyCupTotal();

    //This creates a loop that populates a location report with business & inventory projections by the hour
    var ulEl = document.getElementById('PikePlace');

    for (var i = 0; i < hourOfOperation.length; i++) {

    //create an <li>
      var liEl = document.createElement('li');

    //give that <li> content
      liEl.textContent = hourOfOperation[i] + '' + this.totalHourlyBeans[i] + ' [' + this.randomCustomerPerThatHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.cupBeansPerHour[i] + ' lbs), ' + this.toGoBeansPerHour[i] + ' lbs to-go]';

    //append the <li> to the <ul>
      ulEl.appendChild(liEl);
    }
    var totalCustomerliEl = document.createElement('li');
    totalCustomerliEl.textContent = 'Total customers at ' + this.locationName + ' : ' + this.totalDailyCustomers;
    ulEl.appendChild(totalCustomerliEl);

    var totalCupsSoldliEl = document.createElement('li');
    totalCupsSoldliEl.textContent = 'Total cups sold at ' + this.locationName + ' : ' + this.totalDailyCups;
    ulEl.appendChild(totalCupsSoldliEl);

    var totalToGoliEl = document.createElement('li');
    totalToGoliEl.textContent = 'Total pound packages sold at ' + this.locationName + ' : ' + this.totalDailyToGoBeans;
    ulEl.appendChild(totalToGoliEl);

    var totalBeansliEl = document.createElement('li');
    totalBeansliEl.textContent = 'Total pound beans needed at ' + this.locationName + ' : ' + this.totalDailyBeans;
    ulEl.appendChild(totalBeansliEl);

  },
};

PikePlace.render();

var CapitolHill = {
  locationName: 'Capitol Hill',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  randomCustomerPerThatHour: [],
  totalDailyCustomers: 0,

  lbsPerCustomerToGoBeans: 0.34,
  toGoBeansPerHour: [],
  totalDailyToGoBeans: 0,

  cupsPerCustomer: 1.2,
  cupsPerHour: [],
  totalDailyCupBeans: 0,   //.0625 lbs of beans per cup of coffee
  cupBeansPerHour: [],

  totalHourlyBeans: [], // toGoBeansPerHour + (cupsPerHour[i] * .0625)
  totalDailyBeans: 0,

  totalDailyCups: 0,
  employeesNeededPerHour: [],

  calculateCustomerTraffic: function (min, max) {
    for (var i = 0; i < hourOfOperation.length; i++) {
      customersPerHour = Math.floor(Math.random() * (max - min + 1)) + min;
      this.randomCustomerPerThatHour.push(customersPerHour);
      this.totalDailyCustomers += customersPerHour;
      this.employeesNeededPerHour.push(Math.ceil(customersPerHour * 2/60));
    }
  },

  hourlyToGoBeansTotal: function() {
    for (var i = 0; i < hourOfOperation.length; i++) {
      beans = parseFloat((this.randomCustomerPerThatHour[i] * this.lbsPerCustomerToGoBeans).toFixed(1));
      this.toGoBeansPerHour.push(beans);
      this.totalDailyToGoBeans += Math.ceil(beans);
    }
  },

  hourlyCupTotal: function() {
    console.log('Hi');
    for (var i = 0; i < hourOfOperation.length; i++) {
      cups = parseFloat((this.randomCustomerPerThatHour[i] * this.cupsPerCustomer).toFixed(1));
      this.cupsPerHour.push(cups);
      this.totalDailyCups += Math.ceil(cups);
      this.totalHourlyBeans.push(Math.ceil(this.toGoBeansPerHour[i] + (this.cupsPerHour[i] * .0625)));
      this.cupBeansPerHour.push(this.cupsPerHour[i] * .0625);
      this.totalDailyCupBeans = Math.ceil((this.totalDailyCups * .0625));
      this.totalDailyBeans = Math.ceil(this.totalDailyToGoBeans + this.totalDailyCupBeans);
    }
  },

  render: function() {
    CapitolHill.calculateCustomerTraffic(CapitolHill.minCustomersHour, CapitolHill.maxCustomersHour);
    CapitolHill.hourlyToGoBeansTotal();
    CapitolHill.hourlyCupTotal();

    //This creates a loop that populates a location report with business & inventory projections by the hour
    var ulEl = document.getElementById('CapitolHill');

    for (var i = 0; i < hourOfOperation.length; i++) {

    //create an <li>
      var liEl = document.createElement('li');

    //give that <li> content
      liEl.textContent = hourOfOperation[i] + '' + this.totalHourlyBeans[i] + ' [' + this.randomCustomerPerThatHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.cupBeansPerHour[i] + ' lbs), ' + this.toGoBeansPerHour[i] + ' lbs to-go]';

    //append the <li> to the <ul>
      ulEl.appendChild(liEl);
    }
    var totalCustomerliEl = document.createElement('li');
    totalCustomerliEl.textContent = 'Total customers at ' + this.locationName + ' : ' + this.totalDailyCustomers;
    ulEl.appendChild(totalCustomerliEl);

    var totalCupsSoldliEl = document.createElement('li');
    totalCupsSoldliEl.textContent = 'Total cups sold at ' + this.locationName + ' : ' + this.totalDailyCups;
    ulEl.appendChild(totalCupsSoldliEl);

    var totalToGoliEl = document.createElement('li');
    totalToGoliEl.textContent = 'Total pound packages sold at ' + this.locationName + ' : ' + this.totalDailyToGoBeans;
    ulEl.appendChild(totalToGoliEl);

    var totalBeansliEl = document.createElement('li');
    totalBeansliEl.textContent = 'Total pound beans needed at ' + this.locationName + ' : ' + this.totalDailyBeans;
    ulEl.appendChild(totalBeansliEl);

  },
};

CapitolHill.render();

var SeattlePublicLibrary = {
  locationName: 'Seattle Public Library',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  randomCustomerPerThatHour: [],
  totalDailyCustomers: 0,

  lbsPerCustomerToGoBeans: 0.34,
  toGoBeansPerHour: [],
  totalDailyToGoBeans: 0,

  cupsPerCustomer: 1.2,
  cupsPerHour: [],
  totalDailyCupBeans: 0,   //.0625 lbs of beans per cup of coffee
  cupBeansPerHour: [],

  totalHourlyBeans: [], // toGoBeansPerHour + (cupsPerHour[i] * .0625)
  totalDailyBeans: 0,

  totalDailyCups: 0,
  employeesNeededPerHour: [],

  calculateCustomerTraffic: function (min, max) {
    for (var i = 0; i < hourOfOperation.length; i++) {
      customersPerHour = Math.floor(Math.random() * (max - min + 1)) + min;
      this.randomCustomerPerThatHour.push(customersPerHour);
      this.totalDailyCustomers += customersPerHour;
      this.employeesNeededPerHour.push(Math.ceil(customersPerHour * 2/60));
    }
  },

  hourlyToGoBeansTotal: function() {
    for (var i = 0; i < hourOfOperation.length; i++) {
      beans = parseFloat((this.randomCustomerPerThatHour[i] * this.lbsPerCustomerToGoBeans).toFixed(1));
      this.toGoBeansPerHour.push(beans);
      this.totalDailyToGoBeans += Math.ceil(beans);
    }
  },

  hourlyCupTotal: function() {
    console.log('Hi');
    for (var i = 0; i < hourOfOperation.length; i++) {
      cups = parseFloat((this.randomCustomerPerThatHour[i] * this.cupsPerCustomer).toFixed(1));
      this.cupsPerHour.push(cups);
      this.totalDailyCups += Math.ceil(cups);
      this.totalHourlyBeans.push(Math.ceil(this.toGoBeansPerHour[i] + (this.cupsPerHour[i] * .0625)));
      this.cupBeansPerHour.push(this.cupsPerHour[i] * .0625);
      this.totalDailyCupBeans = Math.ceil((this.totalDailyCups * .0625));
      this.totalDailyBeans = Math.ceil(this.totalDailyToGoBeans + this.totalDailyCupBeans);
    }
  },

  render: function() {
    SeattlePublicLibrary.calculateCustomerTraffic(SeattlePublicLibrary.minCustomersHour, SeattlePublicLibrary.maxCustomersHour);
    SeattlePublicLibrary.hourlyToGoBeansTotal();
    SeattlePublicLibrary.hourlyCupTotal();

    //This creates a loop that populates a location report with business & inventory projections by the hour
    var ulEl = document.getElementById('SeattlePublicLibrary');

    for (var i = 0; i < hourOfOperation.length; i++) {

    //create an <li>
      var liEl = document.createElement('li');

    //give that <li> content
      liEl.textContent = hourOfOperation[i] + '' + this.totalHourlyBeans[i] + ' [' + this.randomCustomerPerThatHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.cupBeansPerHour[i] + ' lbs), ' + this.toGoBeansPerHour[i] + ' lbs to-go]';

    //append the <li> to the <ul>
      ulEl.appendChild(liEl);
    }
    var totalCustomerliEl = document.createElement('li');
    totalCustomerliEl.textContent = 'Total customers at ' + this.locationName + ' : ' + this.totalDailyCustomers;
    ulEl.appendChild(totalCustomerliEl);

    var totalCupsSoldliEl = document.createElement('li');
    totalCupsSoldliEl.textContent = 'Total cups sold at ' + this.locationName + ' : ' + this.totalDailyCups;
    ulEl.appendChild(totalCupsSoldliEl);

    var totalToGoliEl = document.createElement('li');
    totalToGoliEl.textContent = 'Total pound packages sold at ' + this.locationName + ' : ' + this.totalDailyToGoBeans;
    ulEl.appendChild(totalToGoliEl);

    var totalBeansliEl = document.createElement('li');
    totalBeansliEl.textContent = 'Total pound beans needed at ' + this.locationName + ' : ' + this.totalDailyBeans;
    ulEl.appendChild(totalBeansliEl);

  },
};

SeattlePublicLibrary.render();

var SouthLakeUnion = {
  locationName: 'South Lake Union',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  randomCustomerPerThatHour: [],
  totalDailyCustomers: 0,

  lbsPerCustomerToGoBeans: 0.34,
  toGoBeansPerHour: [],
  totalDailyToGoBeans: 0,

  cupsPerCustomer: 1.2,
  cupsPerHour: [],
  totalDailyCupBeans: 0,   //.0625 lbs of beans per cup of coffee
  cupBeansPerHour: [],

  totalHourlyBeans: [], // toGoBeansPerHour + (cupsPerHour[i] * .0625)
  totalDailyBeans: 0,

  totalDailyCups: 0,
  employeesNeededPerHour: [],

  calculateCustomerTraffic: function (min, max) {
    for (var i = 0; i < hourOfOperation.length; i++) {
      customersPerHour = Math.floor(Math.random() * (max - min + 1)) + min;
      this.randomCustomerPerThatHour.push(customersPerHour);
      this.totalDailyCustomers += customersPerHour;
      this.employeesNeededPerHour.push(Math.ceil(customersPerHour * 2/60));
    }
  },

  hourlyToGoBeansTotal: function() {
    for (var i = 0; i < hourOfOperation.length; i++) {
      beans = parseFloat((this.randomCustomerPerThatHour[i] * this.lbsPerCustomerToGoBeans).toFixed(1));
      this.toGoBeansPerHour.push(beans);
      this.totalDailyToGoBeans += Math.ceil(beans);
    }
  },

  hourlyCupTotal: function() {
    console.log('Hi');
    for (var i = 0; i < hourOfOperation.length; i++) {
      cups = parseFloat((this.randomCustomerPerThatHour[i] * this.cupsPerCustomer).toFixed(1));
      this.cupsPerHour.push(cups);
      this.totalDailyCups += Math.ceil(cups);
      this.totalHourlyBeans.push(Math.ceil(this.toGoBeansPerHour[i] + (this.cupsPerHour[i] * .0625)));
      this.cupBeansPerHour.push(this.cupsPerHour[i] * .0625);
      this.totalDailyCupBeans = Math.ceil((this.totalDailyCups * .0625));
      this.totalDailyBeans = Math.ceil(this.totalDailyToGoBeans + this.totalDailyCupBeans);
    }
  },

  render: function() {
    SouthLakeUnion.calculateCustomerTraffic(SouthLakeUnion.minCustomersHour, SouthLakeUnion.maxCustomersHour);
    SouthLakeUnion.hourlyToGoBeansTotal();
    SouthLakeUnion.hourlyCupTotal();

    //This creates a loop that populates a location report with business & inventory projections by the hour
    var ulEl = document.getElementById('SouthLakeUnion');

    for (var i = 0; i < hourOfOperation.length; i++) {

    //create an <li>
      var liEl = document.createElement('li');

    //give that <li> content
      liEl.textContent = hourOfOperation[i] + '' + this.totalHourlyBeans[i] + ' [' + this.randomCustomerPerThatHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.cupBeansPerHour[i] + ' lbs), ' + this.toGoBeansPerHour[i] + ' lbs to-go]';

    //append the <li> to the <ul>
      ulEl.appendChild(liEl);
    }
    var totalCustomerliEl = document.createElement('li');
    totalCustomerliEl.textContent = 'Total customers at ' + this.locationName + ' : ' + this.totalDailyCustomers;
    ulEl.appendChild(totalCustomerliEl);

    var totalCupsSoldliEl = document.createElement('li');
    totalCupsSoldliEl.textContent = 'Total cups sold at ' + this.locationName + ' : ' + this.totalDailyCups;
    ulEl.appendChild(totalCupsSoldliEl);

    var totalToGoliEl = document.createElement('li');
    totalToGoliEl.textContent = 'Total pound packages sold at ' + this.locationName + ' : ' + this.totalDailyToGoBeans;
    ulEl.appendChild(totalToGoliEl);

    var totalBeansliEl = document.createElement('li');
    totalBeansliEl.textContent = 'Total pound beans needed at ' + this.locationName + ' : ' + this.totalDailyBeans;
    ulEl.appendChild(totalBeansliEl);

  },
};

SouthLakeUnion.render();

var SeaTacAirport = {
  locationName: 'Seatac Airport',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  randomCustomerPerThatHour: [],
  totalDailyCustomers: 0,

  lbsPerCustomerToGoBeans: 0.34,
  toGoBeansPerHour: [],
  totalDailyToGoBeans: 0,

  cupsPerCustomer: 1.2,
  cupsPerHour: [],
  totalDailyCupBeans: 0,   //.0625 lbs of beans per cup of coffee
  cupBeansPerHour: [],

  totalHourlyBeans: [], // toGoBeansPerHour + (cupsPerHour[i] * .0625)
  totalDailyBeans: 0,

  totalDailyCups: 0,
  employeesNeededPerHour: [],

  calculateCustomerTraffic: function (min, max) {
    for (var i = 0; i < hourOfOperation.length; i++) {
      customersPerHour = Math.floor(Math.random() * (max - min + 1)) + min;
      this.randomCustomerPerThatHour.push(customersPerHour);
      this.totalDailyCustomers += customersPerHour;
      this.employeesNeededPerHour.push(Math.ceil(customersPerHour * 2/60));
    }
  },

  hourlyToGoBeansTotal: function() {
    for (var i = 0; i < hourOfOperation.length; i++) {
      beans = parseFloat((this.randomCustomerPerThatHour[i] * this.lbsPerCustomerToGoBeans).toFixed(1));
      this.toGoBeansPerHour.push(beans);
      this.totalDailyToGoBeans += Math.ceil(beans);
    }
  },

  hourlyCupTotal: function() {
    console.log('Hi');
    for (var i = 0; i < hourOfOperation.length; i++) {
      cups = parseFloat((this.randomCustomerPerThatHour[i] * this.cupsPerCustomer).toFixed(1));
      this.cupsPerHour.push(cups);
      this.totalDailyCups += Math.ceil(cups);
      this.totalHourlyBeans.push(Math.ceil(this.toGoBeansPerHour[i] + (this.cupsPerHour[i] * .0625)));
      this.cupBeansPerHour.push(this.cupsPerHour[i] * .0625);
      this.totalDailyCupBeans = Math.ceil((this.totalDailyCups * .0625));
      this.totalDailyBeans = Math.ceil(this.totalDailyToGoBeans + this.totalDailyCupBeans);
    }
  },

  render: function() {
    SeaTacAirport.calculateCustomerTraffic(SeaTacAirport.minCustomersHour, SeaTacAirport.maxCustomersHour);
    SeaTacAirport.hourlyToGoBeansTotal();
    SeaTacAirport.hourlyCupTotal();

    //This creates a loop that populates a location report with business & inventory projections by the hour
    var ulEl = document.getElementById('SeaTacAirport');

    for (var i = 0; i < hourOfOperation.length; i++) {

    //create an <li>
      var liEl = document.createElement('li');

    //give that <li> content
      liEl.textContent = hourOfOperation[i] + '' + this.totalHourlyBeans[i] + ' [' + this.randomCustomerPerThatHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.cupBeansPerHour[i] + ' lbs), ' + this.toGoBeansPerHour[i] + ' lbs to-go]';

    //append the <li> to the <ul>
      ulEl.appendChild(liEl);
    }
    var totalCustomerliEl = document.createElement('li');
    totalCustomerliEl.textContent = 'Total customers at ' + this.locationName + ' : ' + this.totalDailyCustomers;
    ulEl.appendChild(totalCustomerliEl);

    var totalCupsSoldliEl = document.createElement('li');
    totalCupsSoldliEl.textContent = 'Total cups sold at ' + this.locationName + ' : ' + this.totalDailyCups;
    ulEl.appendChild(totalCupsSoldliEl);

    var totalToGoliEl = document.createElement('li');
    totalToGoliEl.textContent = 'Total pound packages sold at ' + this.locationName + ' : ' + this.totalDailyToGoBeans;
    ulEl.appendChild(totalToGoliEl);

    var totalBeansliEl = document.createElement('li');
    totalBeansliEl.textContent = 'Total pound beans needed at ' + this.locationName + ' : ' + this.totalDailyBeans;
    ulEl.appendChild(totalBeansliEl);

  },
};

SeaTacAirport.render();
