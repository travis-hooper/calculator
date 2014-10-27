// myApp declaration
var myApp = angular.module('myApp', ['ngRoute']);

// routes
myApp.config(function($routeProvider) {
	$routeProvider

	// route for homepage
	.when('/', {
		templateUrl : 'html/home.html',
		controller : 'homeCtrl'
	})

	.when('/:subject', {
		templateUrl : 'html/home.html',
		controller : 'subCatCtrl'
	})

	.when('/:subject/:calc', {
		templateUrl : 'html/calculator.html',
		controller : 'calculatorCtrl'
	})

	.otherwise({
		redirectTo: '/'
	});
});

// controllers


myApp.controller('homeCtrl', function($rootScope) {
	$("#wrapper").addClass('toggled');
	$rootScope.shown = {};
});

// populates dropdown menu
myApp.controller('dropDownCtrl', function($rootScope) {
	$rootScope.subjects = subjects;
});

// initializes search box
myApp.controller('searchCtrl', function($rootScope) {

	(function () {
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
	})();

	$("#search-box-form").submit(function () {
		var searchValue = $("#search-box").val().toLowerCase(),
		searchObj, searchObjKey, searchObjRoute, searchSubCat;
		
		var findSubject = function (obj, name, objKey, route, subCat) {
			for (var key in obj) {
				route = obj.route ? obj.route : route;
				subCat = obj[key].calc ? key : subCat;
				if ( typeof obj[key] === 'object' ) {
					findSubject(obj[key], name, key, route, subCat);
				} else if (obj.name.toLowerCase() === name) {
					searchSubCat = subCat;
					searchObjRoute = route;
					searchObjKey = objKey;
					searchObj = obj;
					break;
				}
			}
		};
		findSubject(subjects, searchValue);
		window.location.href = ("#/" + searchObjRoute);
		$rootScope.subCat = searchSubCat;
		console.log(searchSubCat);
		if (!$rootScope.shown) {
			$rootScope.shown = {};
		}
		$rootScope.shown[searchSubCat] = true;
	});
});

myApp.controller('subCatCtrl', function($rootScope, $location) {
	subjectObj = $location.$$path.split('/')[1];
	if (!$rootScope.shown) {
		$rootScope.shown = {};
	}
	$rootScope.hideAll = function () {
		$rootScope.shown = {};
	};
	$rootScope.subjectObj = subjects[subjectObj];
	$("#wrapper").removeClass("toggled");
	$rootScope.toggleSubCat = function (key) {
		$rootScope.shown[key] = $rootScope.shown[key] ? false : true;
		$rootScope.subCat = key;
	};
	$rootScope.subCatState = function (key) {
		return $rootScope.shown[key] ? undefined : 'toggled';
	};
});

myApp.controller('calculatorCtrl', function($rootScope, $location) {
	var calculatorObj = $location.$$path.split('/')[2];
	var subjectObj = $location.$$path.split('/')[1];
	$rootScope.answer = '';
	$rootScope.subjectObj = subjects[subjectObj];
	subCat = $rootScope.subCat;
	$rootScope.calculatorObj = subjects[subjectObj].subCats[subCat].calc[calculatorObj];
	$rootScope.myVars = {};
	console.log($rootScope.myVars = {});
	console.log($rootScope.calculatorObj.params.input);
	$rootScope.showUnits = $rootScope.calculatorObj.params.units ? true : false;
	$rootScope.output = function () {
		for (var key in $rootScope.myVars) {
			$rootScope.myVars[key] = parseInt($rootScope.myVars[key]);
		}
		$rootScope.answer = $rootScope.calculatorObj.func($rootScope.myVars);
	};
});

$(document).on('ready', function () {
	$("#subject-dropdown, #search-box").on('click', function () {
		$("#wrapper").addClass("toggled");
	});
	$(".dropdown-subject").on('click', function () {
		$("#wrapper").removeClass("toggled");
	});
	$("#search-box-form").on('submit', function () {
		$("#wrapper").removeClass("toggled");
	});
});

