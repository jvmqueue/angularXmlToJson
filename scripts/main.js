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

    var _func = {
        request:function(paramPath){
            $http({
                method:'GET',
                url:paramPath
            }).then(function successCallback(response){

                var data = response.data;
                var xmlResponseXml = $(response.data)[2];

                var jsonFromXml = _func.convertXmlToJson(xmlResponseXml);

                console.group('SUCCESS CALL BACK');
                    console.log('jsonFromXml:\t', jsonFromXml);
                   console.groupEnd(); 

            }, function errorCallback(){
                console.group('ERROR CALL BACK');
                    console.log(':\t', 'Reached');
                   console.groupEnd(); 
            })
        }, // End request
        convertXmlToJson:function(paramXml){

            var xml = paramXml;
            var obj = {};
            var nodeAttribute = null;
            var blnNotPrintable = true; // assume not a printable string

            if(xml.nodeType == 1){
                var len = xml.attributes.length;
                if(len > 0){
                    obj['@attributes'] = {};
                    for(var i = 0; i < len; i++){
                        nodeAttribute = xml.attributes.item(i);
                        obj['@attributes'][nodeAttribute.nodeName] = nodeAttribute.nodeValue;
                    }
                } // End inner if
            }else if(xml.nodeType == 3){
                var text = xml.nodeValue;
                blnNotPrintable = util.regex.blnNotPrintable(text); // service

                if( (blnNotPrintable === false) && text.length > 1 ){ 
                    obj = text;                     
                }
                
            }

            if(xml.hasChildNodes){
                for(var i =0, len = xml.childNodes.length; i < len; i++){
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;

                    nodeName = util.regex.strReplace(nodeName, '#', ''); // replace #text with text
                    
                    if( typeof( obj[nodeName] == 'undefined' ) ){
                        blnNotPrintable = util.regex.blnNotPrintable(item.data); // service
                        if(blnNotPrintable === true){
                            continue; // avoid storing objects of #text
                        }
                        // TODO: if collection of children like option, option, option, store in an array object

                        obj[nodeName] = _func.convertXmlToJson(item); // recursion
                    }else{
                        if( typeof( obj[nodeName] ).push == 'undefined' ){
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }

                        obj[nodeName].push( _func.convertXmlToJson(item) );
                    }
                }
            }
            return obj;
        }  // End convertXmlToJson
    }; // End _func

    self.init = (function(){

        $http.defaults.headers.common.Accept = 'text/xml';
        _func.request('/angular/site/data/index.xml');
    })();


}]);
