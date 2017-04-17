angular
  .module('tripApp')
  .controller('TripsNewCtrl', TripsNewCtrl);

TripsNewCtrl.$inject = ['Trip', 'User', '$state', 'Airport', 'skyscanner'];
function TripsNewCtrl(Trip, User, $state, Airport, skyscanner) {
  const vm = this;
  vm.trip = {};
  vm.users = User.query();

//show all the Airports avaliable from LGW

  vm.all = Airport.query();
  vm.flights = [];

  function getFlights() {
    skyscanner.getFlights('anywhere')
      .then((quotes) => {
        vm.flights = quotes;
      });
  }

  getFlights();

  function tripsCreate() {
    Trip
      .save({ trip: vm.trip })
      .$promise
      .then(() => $state.go('tripsIndex'));
  }

  vm.create = tripsCreate;
}
