/**
 * Created by smita on 06.05.15.
 */
'use strict';
var imageControllers = angular.module('imageControllers', []);
imageControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
    $scope.searchedImages = [];

    $scope.searchForImages = function () {
        $http({
            url:'https://www.flickr.com/services/rest',
            method: 'GET',
            params: {
                method: 'flickr.photos.search',
                api_key: '239125bcc03d4efa36227d1e4eec735a',
                text: $scope.searchTerm,
                format: 'json',
                nojsoncallback: 1

            }
        }).success(function(data) {
            $scope.searchedImages = data;
        }).error(function (error) {
            console.log(error);
        });
    };

}]);

imageControllers.controller('DetailController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.imageId = $routeParams.imageId;

    //To fetch the pic url
    $http({
        url:'https://www.flickr.com/services/rest',
        method: 'GET',
        params: {
            method: 'flickr.photos.getSizes',
            api_key: '239125bcc03d4efa36227d1e4eec735a',
            photo_id: $scope.imageId,
            format: 'json',
            nojsoncallback: 1
        }
    }).success(function(data) {
        $scope.sizes = data.sizes.size;
        for (var i = 0; i < $scope.sizes.length; i++) {
            if($scope.sizes[i].label == "Original") {
                $scope.bigImage = $scope.sizes[i].source;
            }
        }

    }).error(function(error){
        console.log(error);
    });

    //To fetch the exif data
    $http({
        url:'https://www.flickr.com/services/rest',
        method: 'GET',
        params: {
            method: 'flickr.photos.getExif',
            api_key: '239125bcc03d4efa36227d1e4eec735a',
            photo_id: $scope.imageId,
            format: 'json',
            nojsoncallback: 1
        }
    }).success(function(data) {
        $scope.exifData = data;
    }).error(function(error){
        console.log(error);
    });
}]);
