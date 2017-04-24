//for editing and deleting profile
angular
  .module('tripApp')
  .controller('ProfileCtrl', ProfileCtrl)
  .controller('EditCtrl', EditCtrl);

ProfileCtrl.$inject = ['User','$stateParams', '$http', '$state', '$auth', 'Trip'];
function ProfileCtrl(User, $stateParams, $http, $state, $auth, Trip){
  const vm = this;

  // if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });
  //
  // vm.isAuthenticated = $auth.isAuthenticated;

  vm.user = Trip.get($stateParams);

  console.log('workigggg', vm.user.id);

  vm.allUserTrips = [];

  function getUsersTrips(){
    Trip.query()
    .$promise
    .then((trips)=>{
      trips.forEach((trip)=>{
        if(trip.user.id === vm.user.id){
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
      .then(() => $state.go('home'));
  }
  vm.delete = profileDelete;
}


//=============================EDIT USER======================

EditCtrl.$inject = ['User', '$state', '$stateParams'];
function EditCtrl(User, $state, $stateParams){
  //gets the user from the profile passed in
  const vm = this;
  console.log(vm.currentUser, 'workkkkkkkk!!!!!!!!!');
  vm.user = User.get($stateParams);
//updates the user
  function updateUser(){
    console.log(vm.user, 'vm.user');
    console.log(vm.user.id, 'vm.user.id');
    // vm.user
    User
      .update({id: vm.user.id, user: vm.user })
      .$promise
      .then(()=> {
        console.log(vm.user.id, 'vm.user.id2');

        $state.go('profile', { id: vm.user.id });
        // $state.go('profile', $stateParams);
      });
  }
  vm.update= updateUser;

}
