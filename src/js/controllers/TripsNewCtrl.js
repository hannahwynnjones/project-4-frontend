angular
  .module('tripApp')
  .controller('TripsNewCtrl', TripsNewCtrl);

TripsNewCtrl.$inject = ['Trip', 'User', '$state', 'Airport'];
function TripsNewCtrl(Trip, User, $state, Airport) {
  const vm = this;
  vm.trip = {};
  vm.users = User.query();
  vm.airports = Airport.query();

console.log('workimg?');

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

  function tripsCreate() {
    Trip
      .save({ trip: vm.trip })
      .$promise
      .then(() => $state.go('tripsIndex'));
  }

  vm.create = tripsCreate;
}
