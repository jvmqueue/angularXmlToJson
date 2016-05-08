var jvm = jvm || {};
jvm.xmlToJson = (function(){


    var self = {};
    self.documentElement = null;                
    self.hash = {};

    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;    
    
    var _fnc = {
        getAttributes:function(paramNode){
            var node = paramNode;
            var json = [];
            var hash = {};
            var strName = null;
            var strValue = null;

            for(var i = 0, len = node.attributes.length; i < len; i++){
                   strName = node.attributes[i].name;
                   strValue = node.attributes[i].value;
                   hash[strName] = strValue;
                   json.push(hash);
            }
            return json;
        },
        convertXmlToJson:function(options){
            var xml = options.xml;
            var nodeElement = null;
            var nodeName = null;
            var strHashName = options.hashName || null;
            var text = null;
            var obj = options.obj || {};
            var objJson = null;            
            var blnIsNotPrintable = false;
            
            strHashName != null ? strHashName = strHashName.toLowerCase():'';
            if(strHashName in obj){
                obj = obj[strHashName];
            }


            if(xml.nodeType === ELEMENT_NODE){
                   if(xml.firstChild.nodeValue){
                        strHashName = xml.nodeName.toLowerCase();
                        text = xml.firstChild.nodeValue;

                        if(strHashName in obj){ // name in object so must push this onto an array
                            var objTemp = {};
                            var attributes = _fnc.getAttributes(xml);

                            objTemp[strHashName] = {value:text, attributes:attributes};

                            if( Array.isArray(obj[strHashName]) === true ){  
                                
                                obj[strHashName].push({value:text, attributes:attributes});
                                objTemp = null;
                            }else{
                                blnIsNotPrintable = jvm.regEx.fnc.blnNotPrintable(text);    
                                if(!blnIsNotPrintable){ 
                                    obj[strHashName] = [];     
                                    obj[strHashName].push(objTemp);
                                    obj[strHashName].push({value:text, attributes:attributes});
                                }
                            }
                        }else{
                            blnIsNotPrintable = jvm.regEx.fnc.blnNotPrintable(text);    
                            blnIsNotPrintable === true ? obj[strHashName] = {} : obj[strHashName] = {value:text, attributes:attributes};
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