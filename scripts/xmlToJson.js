var jvm = jvm || {};
jvm.xmlToJson = (function(){


    var self = {};
    self.documentElement = null;                
    self.hash = {};

    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;    
    
    var _fnc = {
        convertXmlToJson:function(options){
            var xml = options.xml;
            var nodeElement = null;
            var nodeName = null;
            var strHashName = options.hashName || null;
            var text = null;
            var obj = options.obj || {};
            var objJson = null;
            
            var blnIsNotPrintable = false;

            if(strHashName in obj){
                obj = obj[strHashName];
            }


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
                            blnIsNotPrintable = jvm.regEx.fnc.blnNotPrintable(text);    
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
                self.hash[self.documentElement] = {}; 
            }            

            if( xml && xml.hasChildNodes ){
                var nodeChilds = xml.childNodes;
                for(var i = 0, len = nodeChilds.length; i < len; i++){
                    if(nodeChilds[i].nodeType ===  ELEMENT_NODE){
                        _fnc.convertXmlToJson({xml:nodeChilds[i], hashName:strHashName, obj:obj});
                    }
                }                                
            }

            objJson = obj;
            return objJson;

        }  // End convertXmlToJson

    }; // End _fnc

    return{fnc:_fnc}
})();