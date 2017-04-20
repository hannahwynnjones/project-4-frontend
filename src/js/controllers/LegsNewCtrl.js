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
      vm.lastleg = vm.trip.legs[vm.trip.legs.length -1].airport;
      vm.home = vm.trip.airport;

    });

  function getFlights() {
    const origin = vm.lastleg.code;
    const departDate = vm.leg.start_date;

    skyscanner.getFlights('anywhere', origin, departDate)
      .then((quotes) => {
        // vm.flights = quotes;
        // vm.flights.sort(function(a, b) {
        //   return parseFloat(a.price) - parseFloat(b.price);
        // });
        vm.flights = quotes;
      });
  }

  function goHome() {
    const origin = vm.lastleg.code;
    const departDate = vm.leg.start_date;
    const destination = vm.home.code;

    skyscanner.getFlights(destination, origin, departDate)
      .then((quotes) => {
        // vm.flights = quotes;
        // vm.flights.sort(function(a, b) {
        //   return parseFloat(a.price) - parseFloat(b.price);
        // });
        vm.flights = quotes;
      });
  }

  function legsCreate() {
    vm.leg.trip_id = $stateParams.id;
    vm.airports = vm.airports.filter((airport) => airport.code === vm.leg.code[0]);
    vm.leg.airport_id = vm.leg.code[0];
    vm.leg.airport_id = vm.airports[0].id;
    // vm.leg.airline = flight.CarrierName
    // vm.leg.price = flight.price
    delete vm.leg['code'];

    Leg
      .save({ leg: vm.leg })
      .$promise
      .then(() => $state.go('tripsIndex'));
  }

  vm.create = legsCreate;
  vm.getFlights = getFlights;
  vm.goHome = goHome;
}

// if (vm.trip.legs.length === 0)
//   const origin = vm.trip.airport.code
// else
//   const origin = vm.lastleg.code

//if trip.legs.lenght = 0, the origin airport = vm.trip.home airport, else

//vm.lastleg = vm.trip.legs[vm.trip.legs.length -1].airport;


// if (vm.trip.legs.length === 0) {
//   const origin = vm.trip.airport.code;
// }  else {
//   const origin = vm.lastleg.code
// }
