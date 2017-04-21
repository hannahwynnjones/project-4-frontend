//in leg shema: airport_id, start_date, price(API), airline(API), trip_id

angular
  .module('tripApp')
  .controller('LegsNewCtrl', LegsNewCtrl);

LegsNewCtrl.$inject = ['Leg', 'Trip', 'User', '$state', '$stateParams','Airport', 'skyscanner'];
function LegsNewCtrl(Leg, Trip, User, $state, $stateParams, Airport, skyscanner) {
  const vm = this;
  vm.airports = Airport.query();

  vm.flights = [];
  vm.leg = {};

  Trip.get($stateParams)
    .$promise
    .then((trip) => {
      vm.trip = trip;
      // vm.lastleg = vm.trip.legs[vm.trip.legs.length -1].airport;
      // console.log(vm.lastleg);
      // console.log(vm.trip.airport.code);
      console.log(vm.airports);
      vm.lastleg = vm.trip.legs[vm.trip.legs.length -1].airport;
      vm.home = vm.trip.airport;
    });

  function getFlights() {
    if (vm.trip.legs.length === 0) {
      getFirstFlights();
    } else {
      getNextFlights();
    }
  }

  function getFirstFlights() {
    const departDate = vm.leg.start_date;
    const origin = vm.trip.airport.code;
    console.log(origin);
    skyscanner.getFlights('anywhere', origin, departDate)
      .then((quotes) => {
        vm.flights = quotes;
        console.log(origin);
      });
  }

  function getNextFlights() {
    vm.lastleg = vm.trip.legs[vm.trip.legs.length -1].airport;

    const departDate = vm.leg.start_date;
    const origin = vm.lastleg.code;
    console.log(origin);

    skyscanner.getFlights('anywhere', origin, departDate)
      .then((quotes) => {
        vm.flights = quotes;
        console.log(quotes.length);
        // removeDuplicates();
      });

    // function removeDuplicates(quotes, MinPrice) {
    //
    //   console.log('working2', length)
    //   var trimmedArray = [];
    //   var values = [];
    //   var value;
    //
    //   for(var i = 0; i < length; i++) {
    //     value = quotes[i][MinPrice];
    //
    //     if(values.indexOf(value) === -1) {
    //       trimmedArray.push(quotes[i]);
    //       values.push(value);
    //     }
    //     console.log(trimmedArray);
    //   }
    //
    //   return trimmedArray;
    //
    // }
  }

  vm.getFlights = getFlights;


  function goHome() {
    vm.lastleg = vm.trip.legs[vm.trip.legs.length -1].airport;
    const origin = vm.lastleg.code;
    const departDate = vm.leg.start_date;
    const destination = vm.home.code;

    skyscanner.getFlights(destination, origin, departDate)
      .then((quotes) => {
        vm.flights = quotes;
      });
  }

  vm.goHome = goHome;

  function legsCreate() {
    vm.leg.trip_id = $stateParams.id;
    vm.leg.airport_id = vm.airports.find((airport) => airport.code === vm.selectedFlight.code).id;
    vm.leg.airline = vm.selectedFlight.CarrierName;
    vm.leg.price = vm.selectedFlight.MinPrice;

    Leg
      .save({ leg: vm.leg })
      .$promise
      .then(() => $state.go('tripsIndex'));
  }

  vm.create = legsCreate;
}
