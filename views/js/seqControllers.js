  angular.module('baseServer.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http,$ionicModal,$location,$ionicPopup,CONFIG) {



 $ionicModal.fromTemplateUrl('templates/setModal.html', {scope: $scope,animation: 'slide-in-up'}).then(function(modal) {$scope.setModal = modal;});
 $scope.openSetSeq = function() {$scope.setModal.show();};
 $scope.closesetSeq = function() {$scope.setModal.hide();};



})