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
        console.log(origin);
      });
  }

  vm.getFlights = getFlights;

  function legsCreate() {
    vm.leg.trip_id = $stateParams.id;
    vm.airports = vm.airports.filter((airport) => airport.code === vm.leg.code[0]);
    console.log(vm.airports);
    vm.leg.airport_id = vm.leg.code[0];
    vm.leg.airport_id = vm.airports[0].id;
    delete vm.leg['code'];

    Leg
      .save({ leg: vm.leg })
      .$promise
      .then(() => $state.go('tripsIndex'));
  }

  vm.create = legsCreate;
}
