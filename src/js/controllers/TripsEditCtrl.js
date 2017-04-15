angular
  .module('tripApp')
  .controller('TripsEditCtrl', TripsEditCtrl);

TripsEditCtrl.$inject = ['Trip', 'User', '$stateParams', '$state'];
function TripsEditCtrl(Trip, User, $stateParams, $state) {
  const vm = this;

  Trip.get($stateParams).$promise.then((trip) => {
    vm.trip = trip;
    vm.trip.date = new Date(trip.date); //otherwise angular gets confused by ruby's date format
  });

  vm.users = User.query();

  function tripsUpdate() {
    Trip
      .update({id: vm.trip.id, trip: vm.trip })
      .$promise
      .then(() => $state.go('tripsShow', { id: vm.trip.id }));
  }

  vm.update = tripsUpdate;
}
