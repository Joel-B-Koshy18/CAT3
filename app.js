(function () {
    'use strict';

    angular.module('myApp', ["ngRoute"])

        .controller('MyController', function ($scope, $http) {
            $http.get('http://localhost:3000/').then(function (response) {
                $scope.datas = response.data
            })
        })

        .controller('createController', function ($scope) {
            $scope.createEntry = function () {
                var newData = "{\"emp_id\":\"" + $scope.emp_id + "\", \"emp_name\":\"" + $scope.emp_name + "\", \"emp_designation\":\"" + $scope.emp_designation + "\", \"emp_dep\":\"" + $scope.emp_dep + "\", \"emp_salary\":\"" + $scope.emp_salary + "\", \"emp_location\":\"" + $scope.emp_location + "\"}";

                fetch('http://localhost:3000/new', {
                    method: "POST",
                    body: newData,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.emp_id=""
                $scope.emp_name=""
                $scope.emp_dep=""
                $scope.emp_designation=""
                $scope.emp_salary=""
                $scope.emp_location=""
            };
        })

        .controller('updateController', function ($scope, $http) {
            $http.get('http://localhost:3000/').then(function (response) {
                $scope.datas = response.data
            })

            $scope.getId = function () {
                var selectedId = $scope.emp_id
                console.log(selectedId)
                $scope.emp_name = selectedId['emp_name']
                $scope.emp_designation = selectedId['emp_designation']
                $scope.emp_dep = selectedId['emp_dep']
                $scope.emp_salary = selectedId['emp_salary']
                $scope.emp_location = selectedId['emp_location']
            }

            $scope.updateEntry = function () {
                var newData = "{\"emp_id\":\"" + $scope.emp_id['emp_id'] + "\", \"emp_name\":\"" + $scope.emp_name + "\", \"emp_designation\":\"" + $scope.emp_designation + "\", \"emp_dep\":\"" + $scope.emp_dep + "\", \"emp_salary\":\"" + $scope.emp_salary + "\", \"emp_location\":\"" + $scope.emp_location + "\"}";
                 console.log(newData)
                fetch('http://localhost:3000/update', {
                    method: "POST",
                    body: newData,
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json()) 
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.emp_id=""
                $scope.emp_name=""
                $scope.emp_designation=""
                $scope.emp_dep=""
                $scope.emp_salary =""
                $scope.emp_location=""
            };
        })

        .controller('searchController', function ($scope, $rootScope) {
            $scope.getData = function () {
                var searchJson = { status: $scope.emp_location }
                var jsonObj = JSON.stringify(searchJson)
                fetch('http://localhost:3000/search', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    $scope.datas = json
                })
                .catch(err => console.log(err))
            }
        })

        .controller('deleteController', function ($scope, $http) {
            $http.get('http://localhost:3000/').then(function (response) {
                $scope.datas = response.data
            })
            $scope.deleteEntry = function () {
                console.log($scope.del.emp_id)
                var delJson = { delID: $scope.del.emp_id }
                console.log(delJson)
                var jsonObj = JSON.stringify(delJson)

                fetch('http://localhost:3000/delete', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.del = ""
            }
        })

        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "view.html"
                })
                .when("/create", {
                    templateUrl: "create.html",
                    controller: "createController"
                })
                .when("/update", {
                    templateUrl: "update.html",
                    controller: "updateController"
                })
                .when("/search", {
                    templateUrl: "search.html",
                    controller: "searchController"
                })
                .when("/searchsal", {
                    templateUrl: "searchsal.html",
                    controller: "searchController"
                })
                .when("/delete", {
                    templateUrl: "delete.html",
                    controller: "deleteController"
                });
        })
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.hashPrefix('');
        }])
})();