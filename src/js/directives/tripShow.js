/* global google:ignore */

angular
   .module('tripApp')
   .directive('worldMap', worldMap);

worldMap.$inject = ['$window'];
function worldMap($window) {
  // const vm = this;
  // vm.users = User.query();
  // vm.airports = Airport.query();
  // vm.trip = Trip.get($stateParams);
  //
  // Trip.get($stateParams)
  //   .$promise
  //   .then((trip) => {
  //     vm.trip = trip;
  //     // vm.lastleg = vm.trip.legs[vm.trip.legs.length -1].airport;
  //     vm.home = vm.trip.airport;
  //     // vm.lat = vm.trip.leg.airport.lat;
  //      console.log(vm.home);
  //      const home = vm.home;
  //
  //     // vm.lng = vm.trip.leg.airport.lng;
  //     // console.log(trip.legs[1].airport.lat);
  //   });

  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="world-map"></div>', //Better for small bits of html rather than creating a new file
    scope: {
      trip: '='
    },

    link($scope, element) {

      // console.log('the trip legs', $scope.trip.legs.length);

      const legs = [{
        start_date: $scope.trip.start_date,
        airport: $scope.trip.airport
      }];

      var tripCoordinates = [
        {lat: $scope.trip.airport.lat, lng: $scope.trip.airport.lng}
      ];

      const map = new $window.google.maps.Map(element[0], {
        zoom: 2,
        center: { lat: 37.7749, lng: 122.4194},
        scrollwheel: false
      });

      $scope.trip.legs.forEach((leg) => {
        legs.push(leg);
        tripCoordinates.push({lat: leg.airport.lat, lng: leg.airport.lng})
      });

      // console.log('thee trip', legs .length);

      var flightPath = new google.maps.Polyline({
        path: tripCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      flightPath.setMap(map);


      legs.forEach((leg) => {
        const marker = new $window.google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: {lat: leg.airport.lat, lng: leg.airport.lng}
        });

        // add a click listener for an infowindow
      });




      // function removeMarkers(markers) {
      //   markers.forEach((marker) => {
      //     marker.setMap(null);
      //   });
      //   return [];
      // }

      // function addLegMarkers() {
      //   legMarkers = removeMarkers(legMarkers);
      //   $scope.legMarkers.forEach((leg) => {
      //     const marker = new $window.google.maps.Marker({
      //       position: { lat: parseFloat(leg.airport.lat), lng: parseFloat(leg.airport.lng)},
      //       map: map
      //     });
      //
      //     legMarkers(marker);
      //   });
      // }
      //
      // addLegMarkers();

    }
  };
  return directive;
}
