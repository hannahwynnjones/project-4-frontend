angular
  .module('tripApp')
  .controller('TripsIndexCtrl', TripsIndexCtrl);

TripsIndexCtrl.$inject = ['Trip', 'User', '$state', '$auth'];
function TripsIndexCtrl(Trip, User, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });
  console.log(vm.currentUser);
  vm.isAuthenticated = $auth.isAuthenticated;
  const currentUser = vm.currentUser;
  vm.user = User.query();
  vm.all = Trip.query();
}
