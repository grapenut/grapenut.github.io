
// chunk an array into subarrays
function chunk(arr, size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
}

// angular module
var app = angular.module('app', ['ui.router']);

// filter publications for first author papers only
app.filter('first_author', function () {
  return function(input) {
    var out = [];
    angular.forEach(input, function(pub) {
      if (pub.authors.startsWith('Ritter')) {
        out.push(pub);
      }
    });
    return out;
  };
});

// filter out non-first author papers
app.filter('not_first_author', function () {
  return function(input) {
    var out = [];
    angular.forEach(input, function(pub) {
      if (!pub.authors.startsWith('Ritter')) {
        out.push(pub);
      }
    });
    return out;
  };
});

// load data for different views
app.controller('nav_controller', function ($scope, $sce, $state, $http) {
  $scope.$state = $state;
  $scope.gallery_num_columns = 3;

  
  if ($state.current.name == 'publications') {
    $http.get('publications.json').success(function (data){
      $scope.publications = data.publications;
    });
  } else if ($state.current.name == 'presentations') {
    $http.get('presentations.json').success(function (data){
      $scope.presentations = data.presentations;
      $scope.posters = data.posters;
    });
  } else if ($state.current.name == 'about') {
    $http.get('about.json').success(function (data){
      $scope.skills = data.skills;
    });
  } else if ($state.current.name == 'gallery') {
    $http.get('gallery.json').success(function (data){
      $scope.gallery = chunk(data.gallery, $scope.gallery_num_columns);
    });
  }
});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/about');
  $urlRouterProvider.when('', '/about');

  $stateProvider
    .state('about', {
      url: '/about',
      templateUrl: 'about.html',
      controller: 'nav_controller'
    })
    .state('publications', {
      url: '/publications',
      templateUrl: 'publications.html',
      controller: 'nav_controller'
    })
    .state('presentations', {
      url: '/presentations',
      templateUrl: 'presentations.html',
      controller: 'nav_controller'
    })
    .state('gallery', {
      url: '/gallery',
      templateUrl: 'gallery.html',
      controller: 'nav_controller'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'contact.html',
      controller: 'nav_controller'
    })

}]);

