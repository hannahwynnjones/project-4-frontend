angular
  .module('tripApp')
  .controller('TripsNewCtrl', TripsNewCtrl);

TripsNewCtrl.$inject = ['Trip', 'User', '$state'];
function TripsNewCtrl(Trip, User, $state) {
  const vm = this;
  vm.trip = {};
  vm.users = User.query();

  function tripsCreate() {
    Trip
      .save({ trip: vm.trip })
      .$promise
      .then(() => $state.go('tripsIndex'));
  }

  vm.create = tripsCreate;
}
