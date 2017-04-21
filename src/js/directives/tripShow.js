/* global google:ignore */

angular
   .module('tripApp')
   .directive('worldMap', worldMap);

worldMap.$inject = ['$window'];
function worldMap($window) {

  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="world-map"></div>', //Better for small bits of html rather than creating a new file
    scope: {
      trip: '='
    },

    link($scope, element) {

      const legs = [{
        start_date: $scope.trip.start_date,
        airport: $scope.trip.airport
      }];

      var tripCoordinates = [
        {lat: $scope.trip.airport.lat, lng: $scope.trip.airport.lng}
      ];

      const map = new $window.google.maps.Map(element[0], {
        zoom: 2,
        center: { lat: 0, lng: 20},
        scrollwheel: false
      });

      $scope.trip.legs.forEach((leg) => {
        legs.push(leg);
        tripCoordinates.push({lat: leg.airport.lat, lng: leg.airport.lng});
      });


//=======FLIGHT PATH==================
      var flightPath = new google.maps.Polyline({
        path: tripCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      flightPath.setMap(map);
//====================================================
      legs.forEach((leg) => {
        const marker = new $window.google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: {lat: leg.airport.lat, lng: leg.airport.lng}
        });

        //  legs.forEach((marker) => {
        // google.maps.event.addListener(marker, 'click', function() {
        //   marker.info.open(map, this);
        // });

        var infowindow = new google.maps.InfoWindow({ content: '<p>Lots of Content</p>' });

        marker.addListener('click', function() {
          console.log('click function working');
          map.setZoom(5);
          map.setCenter(marker.position);
          infowindow.open(map, marker);
          // vm.position = marker.position.toJSON();

          // Leg
          //   .query(vm.position)
          //   .$promise
          //   .then((legs) => {
          //     vm.filteredStops = [];
          //     stops.forEach((leg) => {
          //       stop.posts.forEach((post) => {
          //         vm.filteredStops.push(post);
          //       });
          //     });
          //   });
        // });
        });

//////////////////////////////
        // var contentString = '<div id="content">'+
        //     '<div id="siteNotice">'+
        //     '</div>'+
        //     '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
        //     '<div id="bodyContent">'+
        //     '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        //     'sandstone rock formation in the southern part of the '+
        //     'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        //     'south west of the nearest large town, Alice Springs; 450&#160;km '+
        //     '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        //     'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        //     'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        //     'Aboriginal people of the area. It has many springs, waterholes, '+
        //     'rock caves and ancient paintings. Uluru is listed as a World '+
        //     'Heritage Site.</p>'+
        //     '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        //     'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        //     '(last visited June 22, 2009).</p>'+
        //     '</div>'+
        //     '</div>';
        //
        // var infowindow = new google.maps.InfoWindow({
        //   content: contentString
        // });
        // // add a click listener for an infowindow
        // marker.addListener('click', function() {
        //   console.log('working???');
        //   infowindow.open(map, marker);
        //   console.log('working???');
        // });
/////////////////////////////////////////////

      });
    }
  };
  return directive;
}
