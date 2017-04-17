angular
  .module('tripApp')
  .controller('TripsIndexCtrl', TripsIndexCtrl);

TripsIndexCtrl.$inject = ['Trip'];
function TripsIndexCtrl(Trip) {
  const vm = this;

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
