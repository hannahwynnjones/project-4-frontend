angular
  .module('tripApp')
  .controller('TripsShowCtrl', TripsShowCtrl);

TripsShowCtrl.$inject = ['Trip', 'User', 'Comment', '$stateParams', '$state', '$auth', 'Airport'];
function TripsShowCtrl(Trip, User, Comment, $stateParams, $state, $auth, Airport) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.trip = Trip.get($stateParams);
  vm.users = User.query();
  vm.airports = Airport.query();


  Trip.get($stateParams)
    .$promise
    .then((trip) => {

      vm.trip = trip;
      // vm.lastleg = vm.trip.legs[vm.trip.legs.length -1].airport;
      vm.home = vm.trip.airport;
      // vm.lat = vm.trip.leg.airport.lat;
      // vm.lng = vm.trip.leg.airport.lng;
      // console.log(trip.legs[1].airport.lat);

    });
  console.log(vm.trip);
//===================DELETE TRIP==============

  function tripsDelete() {
    vm.trip
      .$remove()
      .then(() => $state.go('tripsIndex'));
  }

  vm.delete = tripsDelete;

  function tripsUpdate() {
    Trip
      .update({id: vm.trip.id, trip: vm.trip });
  }

//===============COMMENTS======================

  function addComment() {
    vm.comment.trip_id = vm.trip.id;

    Comment
      .save({ comment: vm.comment })
      .$promise
      .then((comment) => {
        vm.trip.comments.push(comment);
        vm.comment = {};
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        const index = vm.trip.comments.indexOf(comment);
        vm.trip.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;

//===================ATTENDEES================================

  function toggleAttending() {
    const index = vm.trip.attendee_ids.indexOf(vm.currentUser.id);
    if(index > -1) {
      vm.trip.attendee_ids.splice(index, 1);
      vm.trip.attendees.splice(index, 1);
    } else {
      vm.trip.attendee_ids.push(vm.currentUser.id);
      vm.trip.attendees.push(vm.currentUser);
    }
    tripsUpdate();
  }
  vm.toggleAttending = toggleAttending;

  function isAttending() {
    return $auth.getPayload() && vm.trip.$resolved && vm.trip.attendee_ids.includes(vm.currentUser.id);
  }
  vm.isAttending = isAttending;


}
