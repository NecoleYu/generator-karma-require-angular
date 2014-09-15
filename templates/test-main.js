var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;
var port = '<%= options["web-port"] %>'

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
        <%= bowerConfig %>
    },
    shim: {
        "angular": {
            exports: "angular"
        }
        <% for(var i = 0; i < shimConfig.length; i++) {%>
        ,"<%=shimConfig[i]%>":{
            deps:["angular"],
            exports:"<%=shimConfig[i]%>"
        }
        <% } %>
    },
    // ask Require.js to load these files (all our tests)
    deps: allTestFiles,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

