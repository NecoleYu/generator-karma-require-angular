var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;
var port = '8080'

var pathToModule = function (path) {
    return path.replace(/^\/base\//, 'http://localhost:' + port + '/base/');
};

Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(pathToModule(file));
    }
});


requirejs.config({
    baseUrl: "http://localhost:" + port + "/base",
    paths: {
        "angular":"bower_components/angular/angular.js",
"angular-mocks":"bower_components/angular-mocks/angular-mocks.js",
"angular-scenario":"bower_components/angular-scenario/angular-scenario.js"
    },
    shim: {
        "angular": {
            exports: "angular"
        }
        
        ,"angular-mocks":{
            deps:["angular"],
            exports:"angular-mocks"
        }
        
        ,"angular-scenario":{
            deps:["angular"],
            exports:"angular-scenario"
        }
        
    },
    // ask Require.js to load these files (all our tests)
    deps: allTestFiles,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

