angular
  .module('tripApp')
  .controller('TripsEditCtrl', TripsEditCtrl);

TripsEditCtrl.$inject = ['Trip', 'User', '$stateParams', '$state', 'Airport'];
function TripsEditCtrl(Trip, User, $stateParams, $state, Airport) {
  const vm = this;
  vm.trip = {};
  vm.users = User.query();
  vm.airports = Airport.query();
  // vm.all = Airport.query();

  Trip
    .get($stateParams).$promise.then((trip) => {
      vm.trip = trip;
      vm.trip.date = new Date(trip.date); //otherwise angular gets confused by ruby's date format
    });

  vm.users = User.query();

  function tripsUpdate() {
    Trip
      .update({id: vm.trip.id, trip: vm.trip })
      .$promise
      .then(() => $state.go('tripsShow', { id: vm.trip.id }));
      // .then(() => $state.go('tripsShow', $stateParams));

  }

  vm.update = tripsUpdate;
}


//going to $stateparams insteadof id: vm.trip.id was taken form image uploader
