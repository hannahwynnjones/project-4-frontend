//for editing and deleting profile
angular
  .module('tripApp')
  .controller('ProfileCtrl', ProfileCtrl)
  .controller('EditCtrl', EditCtrl);

ProfileCtrl.$inject = ['User','$stateParams', '$http', '$state', '$auth', 'Trip'];
function ProfileCtrl(User, $stateParams, $http, $state, $auth, Trip){
  const vm = this;

  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.isAuthenticated = $auth.isAuthenticated;

  vm.user = Trip.get($stateParams);

  console.log(vm.currentUser);

  vm.allUserTrips = [];

  function getUsersTrips(){
    Trip.query()
    .$promise
    .then((trips)=>{
      trips.forEach((trip)=>{
        if(trip.createdBy.id === vm.user.id){
          vm.allUserTrips.push(trip);
        }
      });
    });
  }

  vm.user = User.get($stateParams, ()=>{
    console.log(vm.user);
    if(!vm.user.imageSRC) vm.user.imageSRC = vm.user.image;
    getUsersTrips();
  }); // vm.user is the current user's userpage rendering

  function profileDelete() {
    $auth.logout();
    vm.user
      .$remove()
      .then(() => $state.go('tripsIndex'));
  }
  vm.delete = profileDelete;
}


//=============================EDIT USER======================

EditCtrl.$inject = ['User', '$state', '$stateParams'];
function EditCtrl(User, $state, $stateParams){
  //gets the user from the profile passed in
  const vm = this;

  vm.user = User.get($stateParams);
//updates the user
  function updateUser(){
    vm.user
    .$update()
    .then(()=> {
      $state.go('profile', $stateParams);
    });
  }
  vm.update= updateUser;

}
