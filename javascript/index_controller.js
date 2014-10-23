var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
	$routeProvider

	// route for homepage
	.when('/', {
		templateUrl : 'html/home.html',
		controller : 'homeCtrl'
	})

	.when('/subject', {
		templateUrl : 'html/subject.html',
		controller : 'subjectCtrl'
	})

	.when('/calculator', {
		templateUrl : 'html/calculator.html',
		controller : 'calculatorCtrl'
	});
});

myApp.controller('dropDownCtrl', function($scope) {
	$scope.subjects = subjects;
});

myApp.controller('searchCtrl', function($scope) {
	$scope.arr = ['ate', 'bad', 'snooze'];
});

myApp.controller('homeCtrl', function($scope) {

});

myApp.controller('subjectCtrl', function($scope) {

});

myApp.controller('calculatorCtrl', function($scope) {

});


$(document).on('ready', function () {

	function populateSearchBox () {
		var availableSearch = [];
		var findNames = function (obj) {
			for (var key in obj) {
				if ( typeof obj[key] === 'object') {
					findNames(obj[key]);
				} else if (obj[key] === obj.name) {
					availableSearch.push(obj.name);            
				}
			}
		};
		availableSearch = availableSearch.sort();
		findNames(subjects);
		$("#search-box").autocomplete({
			source: availableSearch
		});
	}

	populateSearchBox();

	$("#search-box-form").submit(function () {
		var searchValue = $("#search-box").val(),
		    searchObj;
		
		var findSubject = function (obj, name) {
			for (var key in obj) {
				if ( typeof obj[key] === 'object') {
					findSubject(obj[key], name);
				} else if (obj.name === name) {
					searchObj = obj;
					break;
				}
			}
		};

		findSubject(subjects, searchValue);

		window.location.href = ("#/" + searchObj.route);

	});

});


// angular.module('scopeExample', [])
//   .controller('MyController', ['$scope', function($scope) {
//     $scope.username = 'World';

//     $scope.sayHello = function() {
//       $scope.greeting = 'Hello ' + $scope.username + '!';
//     };
//   }]);


