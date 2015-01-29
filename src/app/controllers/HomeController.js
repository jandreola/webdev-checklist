function HomeController($scope, $location, localStorageService, TodoService) {
    var vm = this;

    vm.projectTypes = TodoService.getTypes();

    vm.createNew = function(project){
        if(!checkAvailability(project.name)){
            if(!confirm('Project name already exists, do you wish to continue?')){
                return false;
            }
        }
        TodoService.create(project);
    };

    function checkAvailability(name){
        return TodoService.checkAvailability(name);
    }
}

angular
    .module('app')
    .controller('HomeController', HomeController);