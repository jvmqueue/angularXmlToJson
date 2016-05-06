/*Reference: https://davidwalsh.name/convert-xml-json*/
var jvm = jvm || {};
jvm.mainApp = new angular.module('mainApp', []);
jvm.mainApp.service('util', 
    function(){
        this.regex = jvm.regEx.fnc;        
        this.xml = jvm.xmlToJson.fnc;
        this.httpRequest = jvm.requestHttp.fnc;
    }
);
jvm.mainApp.controller('controllerMain', ['$scope', 'util', function($scope, util){
    var self = this;
    self.jsonFromXml = null;

    var _fnc = {
        setData:function(data){
            $scope.jsonFromXml = util.xml.convertXmlToJson({xml:data.data.responseXML});
            $scope.$digest(); // tell angular to update model
        },
        getData:function(){
            util.httpRequest.request({url:'data/index.xml', returnData:_fnc.setData});  
        }      
    };

    self.init = (function(){        
          _fnc.getData();
    })(); // End self.init


}]);
