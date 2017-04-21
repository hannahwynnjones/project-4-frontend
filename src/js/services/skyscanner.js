angular
  .module('tripApp')
  .service('skyscanner', Skyscanner);

Skyscanner.$inject = ['$http', 'API_URL'];
function Skyscanner($http, API_URL) {
  const vm = this;

  function getFlights(destination, origin,  departDate) {
    return $http
      .get(`${API_URL}/flights`, { params: { destination, origin, departDate } })
      .then(response => response.data);
  }

  vm.getFlights = getFlights;
}
