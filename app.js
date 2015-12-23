angular
        .module('app', ['ngRoute'])
        .config(config)
        .run(run)
        .controller('appController', function ($rootScope, $scope, $location) {
            $scope.$location = {};
            $scope.$location['path'] = function () {
                var result = $location['path'].call($location);
                return angular.isObject(result) ? angular.toJson(result) : result;
            };
        });

config.$inject = ['$routeProvider'];
function config($routeProvider) {
    $routeProvider
            .when('/homepage', {
                controller: 'HomePageController',
                templateUrl: 'views/homepage.view.html',
                controllerAs: 'vm'
            })
            .when('/about', {
                controller: 'AboutController',
                templateUrl: 'views/about.view.html',
                controllerAs: 'vm'
            })
            .when('/contact', {
                controller: 'ContactController',
                templateUrl: 'views/contact.view.html',
                controllerAs: 'vm'
            })
            .when('/work', {
                controller: 'WorkController',
                templateUrl: 'views/work.view.html',
                controllerAs: 'vm'
            })
            .when('/workDetail', {
                templateUrl: 'views/workDetail.view.html'
            })
            .otherwise({redirectTo: '/homepage'});
}

run.$inject = ['$rootScope', '$location'];
function run($rootScope, $location) {
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        console.log("restriction here: " + $location.path());
        
        $rootScope.isLoading = true;
    });
}