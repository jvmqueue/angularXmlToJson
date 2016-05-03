/*Reference: https://davidwalsh.name/convert-xml-json*/
var jvm = jvm || {};
jvm.mainApp = new angular.module('mainApp', []);
jvm.mainApp.service('util', 
    function(){
        this.regex = jvm.regEx.fnc;        
        this.xml = jvm.xmlToJson.fnc;
    }
);



jvm.mainApp.controller('controllerMain', ['$scope', '$http', 'util', function($scope, $http, util){

    var self = this;
    self.hash = {};
    self.documentElement;
    self.intCounter = 0;
    self.jsonFromXml = null;

    var _func = {
        request:function(paramPath){ // TODO: refactor request so that we can reuse it
            $http({
                method:'GET',
                url:paramPath
            }).then(function successCallback(response){
                var data = response.data;
                var xmlResponseXml = $(response.data)[2];
                self.jsonFromXml = util.xml.convertXmlToJson({xml:xmlResponseXml});

                $scope.jsonFromXml = self.jsonFromXml;
            }, function errorCallback(){
                console.group('ERROR CALL BACK');
                    console.log(':\t', 'Reached');
                   console.groupEnd(); 
            })
        } // End request
    }; // End _func

    self.init = (function(){

        $http.defaults.headers.common.Accept = 'text/xml';
        _func.request('data/index.xml');
    })();


}]);
