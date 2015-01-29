function ChecklistController($routeParams, TodoService) {
    var vm = this;

    var ID = $routeParams.checklistId;

    vm.project = TodoService.get(ID);

    // // Check if there is any project stored
    // vm.storedProjects = localStorageService.keys();

   
    // // view model functions
    // vm.updateProgress = function(){
    //     vm.progress = TodoService.progress(vm.project);
    // };

    // vm.addNewEntry = function(entry){
    //     vm.newEntry = '';
    //     vm.project.myTodos.push({name: entry, done: false});
    //     vm.updateProgress();
    // };

    // vm.save = function(){
    //     if(vm.project.name) {
    //         localStorageService.set(vm.project.name, vm.project);
    //     }
    // };

    // vm.clearAll = function(){
    //      localStorageService.remove(vm.project.name);
    //      $location.path('#!/');
    // };

    // vm.loadChecklist = function(checklist){
    //     vm.project = localStorageService.get(checklist);
    //     vm.updateProgress();
    // };

    // // Watch for changes on project and save
    // $scope.$watch(angular.bind(this, function (project) {
    //     return this.project;
    // }), function(n, o){
    //     if(n !== 0) {
    //         vm.save();
    //     }
    // }, true);
}

angular
    .module('app')
    .controller('ChecklistController', ChecklistController);