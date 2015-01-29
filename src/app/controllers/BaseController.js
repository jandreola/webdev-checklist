function BaseController($scope, TodoService) {
    var vm = this;

    $scope.$on('$locationChangeSuccess', function(){
        vm.storedProjects = TodoService.getProjects();
    });
}

angular
    .module('app')
    .controller('BaseController', BaseController);