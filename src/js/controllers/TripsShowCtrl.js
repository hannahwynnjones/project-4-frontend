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

    //=========================GOOGLE MAPS============================

//   function maps() {
//   // const lat = vm.lat;
//   // const lng = vm.lng;
//
//     const homeLat = vm.home.lat;
//     const homeLng = vm.home.lng;
//
//     // console.log(trip.legs[1].airport.lat);
//     // necessary variables
//     var map = null;
//     var infowindow = null;
//     var latLng = { lat: vm.home.lat, lng: vm.home.lat};
//
//     function initialize() {
//       const latLng = { lat: homeLat, lng: homeLng};
//       map = new google.maps.Map(document.getElementById('map-canvas'), {
//         center: latLng,
//         zoom: 3,
//         scrollwheel: false
//         // mapTypeId: 'roadmap'
//       });
//
//     }
//     initialize();
//     console.log('workign');
//     console.log(vm.lat);
//     function addMarker(location) {
//       var latLng = { lat: vm.lat, lng: vm.lng };
//       var marker = new google.maps.Marker({
//         position: latLng,
//         map: map
//       });
//
//       // Add a Google maps event listener to each that marker, which fires the markerClick function, passing in that individual marker and that individual location
//       marker.addListener('click', () => {
//         markerClick(marker, location);
//       });
//     }
//
// addMarker();
//
//     function markerClick(marker, location) {
//       // If there is an open infowindow on the map, close it
//       if(infowindow) infowindow.close();
//
//       // Locate the data that we need from the individual bike object
//       const country = vm.trip.leg.airport.name;
//       const date = vm.trip.leg.start_date;
//       const price = vm.trip.leg.price;
//       const airline = vm.trip.leg.airline;
//
//       // Update the infowindow variable to be a new Google InfoWindow
//       infowindow = new google.maps.InfoWindow({
//         content: `
//         <div class="infowindow">
//           <h3>${country}</h3>
//           <p>flying to ${country} on the <strong>${date}</strong> with ${airline}</p>
//         </div>
//         `
//       });
//
//       // Finally, open the new InfoWindow
//       infowindow.open(map, marker);
//     }
//   }
//
//
//
//
//
//
//
//
//
//
//
//
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
