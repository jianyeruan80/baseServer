angular.module('baseServer.api', [])
.factory('api',function($http,$q,$ionicPopup,$ionicLoading,CONFIG){
 return{
     request:function(method,url,data,params,contentType){
              var deferred = $q.defer();
              var currentUrl=CONFIG.url+url;
              $ionicLoading.show();
              data=data || {};
              params=params || {};
              var contentType= contentType || { 'Content-Type': 'application/json; charset=UTF-8'};
              contentType["Authorization"]= "Bearer "+CONFIG.info.accessToken;
              $http({
                      method: method,
                      url: currentUrl,
                      headers: contentType,
                      data:data,
                      params:params,
                  }).success(function(data){
                    deferred.resolve(data);
                  }).error(function(err){
                           deferred.reject();
                           $ionicPopup.alert({
                                 title:'<b>Alert Info</b>',
                                 template: '<div style="color:red;font-weight:600;text-align:center;font-size:25px">'+err.message+'</div>'
                          });
                    }).finally(function() {
                    $ionicLoading.hide();
        });
            return deferred.promise;     
    }
  }
})