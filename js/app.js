/**
 * Created by smita on 04.05.15.
 */
'use strict';
var flickrSearch = angular.module('flickrSearch', ['ngRoute', 'imageControllers']);

flickrSearch.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/images', {
            templateUrl: 'pages/image-list.html',
            controller: 'ListController'
        })
        .when('/images/:imageId', {
            templateUrl: 'pages/details.html',
            controller: 'DetailController'

        }).
        otherwise({
            redirectTo: '/images'

        });

}]);