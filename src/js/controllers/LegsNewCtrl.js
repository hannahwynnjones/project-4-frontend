//in leg shema: airport_id, start_date, price(API), airline(API), trip_id

angular
  .module('tripApp')
  .controller('LegsNewCtrl', LegsNewCtrl);

LegsNewCtrl.$inject = ['Leg', 'Trip', 'User', '$state', 'Airport', 'skyscanner'];
function LegsNewCtrl(Leg, Trip, User, $state, Airport, skyscanner) {
  const vm = this;
  vm.leg = {};
  vm.trips = Trip.query();
  vm.airports = Airport.query();

// show all the Airports avaliable from LGW
// Display list of flights as a checkbox, when checkbox is clicked, if flight.code matches airport.code, add to Params as airport_one for trip.-->

  // vm.all = Airport.query();
  // vm.flights = [];
  //
  // function getFlights() {
  //   skyscanner.getFlights('anywhere')
  //     .then((quotes) => {
  //       vm.flights = quotes;
  //       console.log(quotes);
  //     });
  // }
  //
  // getFlights();

  function legsCreate() {
    Trip
      .save({ leg: vm.leg })
      .$promise
      .then(() => $state.go('tripsIndex'));
  }

  vm.create = legsCreate;
}
