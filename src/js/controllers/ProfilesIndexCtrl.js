angular
  .module('tripApp')
  .controller('ProfilesIndexCtrl', ProfilesIndexCtrl);

ProfilesIndexCtrl.$inject = ['User'];
function ProfilesIndexCtrl(User) {
  const vm = this;

  vm.all = User.query();
}
