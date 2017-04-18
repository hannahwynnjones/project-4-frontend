angular
  .module('tripApp')
  .controller('LegsEditCtrl', LegsEditCtrl);

LegsEditCtrl.$inject = ['Leg', 'Trip', 'User', '$stateParams', '$state'];
function LegsEditCtrl(Leg, Trip, User, $stateParams, $state) {
  const vm = this;

  Leg
    .get($stateParams).$promise.then((leg) => {
      vm.leg = leg;
      vm.leg.date = new Date(leg.date); //otherwise angular gets confused by ruby's date format
    });

  vm.users = User.query();

  function legsUpdate() {
    Leg
      .update({id: vm.leg.id, leg: vm.leg })
      .$promise
      // .then(() => $state.go('legsShow', { id: vm.leg.id }));
      .then(() => $state.go('tripsShow', $stateParams));

  }

  vm.update = legsUpdate;
}


//going to $stateparams insteadof id: vm.trip.id was taken form image uploader
