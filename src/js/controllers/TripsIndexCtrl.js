angular
  .module('tripApp')
  .controller('TripsIndexCtrl', TripsIndexCtrl);

TripsIndexCtrl.$inject = ['Trip', 'User', '$state', '$auth'];
function TripsIndexCtrl(Trip, User, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.isAuthenticated = $auth.isAuthenticated;

  console.log(vm.currentUser);

  // vm.user = User.query();
  vm.all = Trip.query();
  // vm.flights = [];
  //
  // function getFlights() {
  //   skyscanner.getFlights('anywhere')
  //     .then((quotes) => {
  //       vm.flights = quotes;
  //     });
  // }
  //
  // getFlights();
}



// TripsIndexCtrl.$inject = ['Trip'];
// function TripsIndexCtrl(Trip) {
//   const vm = this;
//
//   vm.all = Trip.query();
