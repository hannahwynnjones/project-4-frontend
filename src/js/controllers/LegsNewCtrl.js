//in leg shema: airport_id, start_date, price(API), airline(API), trip_id

angular
  .module('tripApp')
  .controller('LegsNewCtrl', LegsNewCtrl);

LegsNewCtrl.$inject = ['Leg', 'Trip', 'User', '$state', '$stateParams','Airport', 'skyscanner'];
function LegsNewCtrl(Leg, Trip, User, $state, $stateParams, Airport, skyscanner) {
  const vm = this;
  vm.leg = {};
  vm.trip = Trip.query();
  vm.airports = Airport.query();
  vm.trip = Trip.get($stateParams);



  Trip.get($stateParams, (data) => {
    const homeAirport = data.airport_id.code;
    const departDate = data.start_date;
    vm.trip = data;
    console.log(data);
  });

  // vm.all = Airport.query();
  vm.flights = [];
  //
  function getFlights() {
    skyscanner.getFlights('anywhere')
      .then((quotes) => {
        vm.flights = quotes;
        data.airline = quotes.carriers;
        data.minPrice = quotes.minPrice;
        console.log(quotes);
      });
  }

  getFlights();

  function legsCreate() {
    Trip
      .save({ leg: vm.leg })
      .$promise
      .then(() => $state.go('tripsIndex'));
  }

  vm.create = legsCreate;
}
