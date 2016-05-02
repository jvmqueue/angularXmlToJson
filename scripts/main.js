/*Reference: https://davidwalsh.name/convert-xml-json*/
var jvm = jvm || {};
jvm.mainApp = new angular.module('mainApp', []);
jvm.mainApp.service('util', 
    function(){
        this.regex = jvm.regEx.fnc;        
    }
);



jvm.mainApp.controller('controllerMain', ['$scope', '$http', 'util', function($scope, $http, util){

    var self = this;
    $scope.buttons = jvm.buttons;
    self.hash = {};
    self.documentElement;
    self.intCounter = 0;

    var _func = {
        request:function(paramPath){
            $http({
                method:'GET',
                url:paramPath
            }).then(function successCallback(response){

                var data = response.data;
                var xmlResponseXml = $(response.data)[2];
                var jsonFromXml = _func.convertXmlToJson(xmlResponseXml);

            }, function errorCallback(){
                console.group('ERROR CALL BACK');
                    console.log(':\t', 'Reached');
                   console.groupEnd(); 
            })
        }, // End request
        convertXmlToJson:function(paramXml, paramObj, paramHashName){
            var xml = paramXml;
            var nodeElement = null;
            var nodeName = null;
            var strHashName = paramHashName || null;
            var text = null;
            var obj = paramObj || {};


            var blnIsNotPrintable = false;
            
            var ELEMENT_NODE = 1;
            var TEXT_NODE = 3;

            if(xml.nodeType === ELEMENT_NODE){
                   if(xml.firstChild.nodeValue){
                        strHashName = xml.nodeName;
                        text = xml.firstChild.nodeValue;
                        if(strHashName in obj){
                            var objTemp = {};
                            objTemp[strHashName] = obj[strHashName];                            

                            if( Array.isArray(obj[strHashName]) === true){
                                obj[strHashName].push(text);
                                objTemp = null;
                            }else{
                                obj[strHashName] = [];
                                obj[strHashName].push(objTemp[strHashName]);
                                obj[strHashName].push(text);
                            }
                        }else{
                            blnIsNotPrintable = util.regex.blnNotPrintable(text)
                            blnIsNotPrintable === true ? obj[strHashName] = {} : obj[strHashName] = xml.firstChild.nodeValue;                        
                        }

                   }
            }else if(xml.nodeType === TEXT_NODE){
                console.group('NODE TYPE 3');
                    console.log('xml:\t', xml);
                   console.groupEnd(); 
            } 

            if(!self.documentElement){
                self.documentElement = xml.nodeName;
                self.hash[self.documentElement]; 
            }            

            if( xml && xml.hasChildNodes ){
                var nodeChilds = xml.childNodes;
                for(var i = 0, len = nodeChilds.length; i < len; i++){
                    if(nodeChilds[i].nodeType ===  1){
                        _func.convertXmlToJson(nodeChilds[i], obj, strHashName);
                    }
                }                                
            }

            console.group('CONVERT XML TO JSON');
                console.log('obj:\t', obj);
               console.groupEnd(); 

        }  // End convertXmlToJson
    }; // End _func

    self.init = (function(){

        $http.defaults.headers.common.Accept = 'text/xml';
        _func.request('data/index.xml');
    })();


}]);
