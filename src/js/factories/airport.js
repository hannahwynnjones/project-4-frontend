angular
  .module('tripApp')
  .factory('Airport', Airport);

Airport.$inject = ['$resource', 'API_URL'];
function Airport($resource, API_URL) {
  return new $resource(`${API_URL}/airports/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
