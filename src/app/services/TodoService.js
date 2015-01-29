function TodoService($location, localStorageService){

    var todoModels = {
        'webdev': {
            'General': [
                {name: 'Favicon', done: false, note: 'This <a href="http://realfavicongenerator.net/" target="_blank">website</a> generates your favicon</a>'},
                {name: 'Apple Icon', done: false, note: 'This <a href="http://realfavicongenerator.net/" target="_blank">website</a> generates apple icons</a>'},
                {name: '404 Page', done: false, note: 'Create a useful 404 page, more info cabe found <a href="https://support.google.com/webmasters/answer/93641?hl=en" target="_blank">here</a>'},
                {name: 'README.md', done: false, note: 'Create a README.md file with instructions, make sure to use <a href="http://en.wikipedia.org/wiki/Markdown" target="_blank">markdown</a> language'},
                {name: 'Wiki', done: false, note: 'Large projects only, include important project information in a wiki'}
            ],
            'Performance' : [
                {name: 'PageSpeed Insights by Google', done: false, note: '<a href="https://chrome.google.com/webstore/detail/pagespeed-insights-by-goo/gplegfbjlmmehdoakndmohflojccocli?hl=en" target="_blank">Chrome Extension</a>'},
                {name: 'YSlow', done: false, note: '<a href="https://chrome.google.com/webstore/detail/yslow/ninejjcohidippngpapiilnmkgllmakh/" target="_blank">Chrome Extension</a>'},
                {name: 'Minification', done: false, note: 'Files compiled for production must be minified'},
                {name: 'Total size / requests', done: false, note: 'Check file size of all requests on browser for anomalies (ex: a png with 2mb or several requests for small images that could be combined into one sprite)'},
            ],
            'Validation' : [
                {name: 'HTML', done: false, note: '<a href="https://chrome.google.com/webstore/detail/validity/bbicmjjbohdfglopkidebfccilipgeif?hl=en-GB" target="_blank">Chrome Extension</a>'},
                {name: 'Javascript', done: false, note: 'Validate Javascript code using JSLint or JSHint. Use a node task manager to handle that (Gulp or Grunt)'},
            ],
            'SEO' : [
                {name: 'Meta Tags', done: false, note: 'All pages must contain a meaningful meta tags, check this <a href="https://support.google.com/webmasters/answer/79812?hl=en" target="_blank">link</a> to find out more.'},
                {name: 'Google Analytics', done: false, note: 'Include google analytics code. <a href="https://support.google.com/analytics/answer/1008080?hl=en" target="_blank">More Info</a>', code: '<script type="text/javascript">\n    r _gaq = _gaq || [];\n    aq.push(["_setAccount", "UA-XXXXX-X"]);\n    aq.push(["_trackPageview"]);\n    unction() {\n    var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;\n    ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";\n    var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);\n    ();\n</script>'},
                {name: 'Sitemap', done: false, note: 'Create a sitemap.xml <a href="https://support.google.com/webmasters/answer/156184?hl=en" target="_blank">More info</a>'},
                {name: 'Robots', done: false, note: 'Create robots.txt to avoid unwanted page indexation by search engines. <a href="https://support.google.com/webmasters/answer/6062608?hl=en" target="_blank">More Info</a>'},
            ],
            'Test' : [
                {name: 'IE Check', done: false, note: 'Check your project in IE8, browse all pages'},
                {name: 'Others browsers', done: false, note: 'Quick check using Chrome, Firefox and Safari'},
                {name: 'Javascript Disabled', done: false, note: 'Disable javascript and test basic website\'s functionalities (ex: forms, hidden content, navigation)'},
                {name: 'Forms', done: false, note: 'Submit all forms to make sure they are working'},
                {name: 'Links', done: false, note: 'Click all links to make sure they are working. Watch out for hardcoded paths to dev environment.'},
                {name: 'Responsiveness', done: false, note: 'Test your project using <a href="https://developer.chrome.com/devtools/docs/device-mode" target="_blank">device mode</a> in Chrome developer tools'},
            ]
        },
        'backend': {
            'General': [],
            'Backend': []
        },
        'qa': {
            'General': [],
            'QA': []
        },
        'design': {
            'General': [],
            'Design': []
        }
    };
   
    var methods = {
        progress: updateProgress,
        getProjects: getProjects,
        get: getSingleProject,
        getTypes: getProjectTypes,
        checkAvailability: checkAvailability,
        create: createProject
    };

    return methods;

    function createProject(project){
        var newProject = project;
        newProject.id = getNewId();
        newProject.todos = getTodoModel(newProject.type);
        newProject.created_at = new Date();

        localStorageService.set(newProject.id, newProject);

        $location.path('/checklist/' + newProject.id);

    }

    function getNewId(){
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function getSingleProject(id){
        return localStorageService.get(id);
    }

    function checkAvailability(name){
        var keys = localStorageService.keys();
        for (var i = 0; i < keys.length; i++) {
            var n = localStorageService.get(keys[i]);
            if(n.name === name) {
                return false;
            }
        }

        return true;
    }

    function getTodoModel(type){

        return todoModels[type];
    }

    function getProjects(){
        var keys = localStorageService.keys(),
            projects = [];
        for (var i = 0; i < keys.length; i++) {
            var project = localStorageService.get(keys[i]);
            projects[i] = {id: project.id, name: project.name};
        }

        return projects;
    }

    function getProjectTypes(){
        return Object.keys(todoModels);
    }

    function updateProgress(data){
        var total   = 0,
            checked = 0;
        // Main todo
        for (var key in data.todos) {
            for (var i = data.todos[key].length - 1; i >= 0; i--) {
                total++;
                if (data.todos[key][i].done) {
                    checked++;
                }
            }
        }

        // my todo
        if(data.myTodos.length){
            for (var idx = data.myTodos.length - 1; idx >= 0; idx--) {
                total++;
                if (data.myTodos[idx].done) {
                    checked++;
                }
            }
        }

        return (checked / total) * 100;
    }

}

angular
    .module('app')
    .factory('TodoService', TodoService);
