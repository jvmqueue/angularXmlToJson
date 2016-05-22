var jvm = jvm || {};
jvm.xmlToJson = (function(){


    var self = {};
    self.documentElement = null;                
    self.hash = {};

    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;    
    var mIntCounter = 0;  
    var mStrTempDelete = '';
    
    var ObjXml = function(){
        if(this.blnIsInstantiated !== true){ // enforce singleton, can be instantiated once
            return this;
        }
        this.blnIsInstantiated = true;
    };
    ObjXml.prototype = {
        getTagName:function(paramNode){
            return paramNode.nodeName;
        },
        getNextElement:function(paramNode){
            var nodeParent = paramNode;
            var space = ' ';
            var json = {};

            for(var i = 0, len = paramNode.childNodes.length; i < len; i++){
                if(paramNode.childNodes[i].nodeType === ELEMENT_NODE){
                    mStrTempDelete += paramNode.childNodes[i].nodeName  + ', ';
                    json[paramNode.childNodes[i].nodeName] = paramNode.childNodes[i].firstChild.nodeValue;
                    console.group('paramNode.childNodes[i]');
                        console.log('paramNode.childNodes[i].nodeName:\t', paramNode.childNodes[i].nodeName);
//                        console.log('strTempDelete:\t', mStrTempDelete);
                        console.log('json:\t', json);
                       console.groupEnd(); 
                }
            }
            
            for(var name in nodeParent){
                if(name === 'children'){ // go deep into children nodes
                    for(var i = 0, len = nodeParent[name].length; i < len; i++){
                        this.getNextElement(nodeParent[name][i]);
                    }
                }
            }
        }
    };

    var _fnc = {
        getAttributes:function(paramNode){
            var node = paramNode;
            var len = node.attributes.length;
            var jsonAttributes = [];
            for(var i = 0; i < len; i++){
                jsonAttributes.push({name:node.attributes[i].name, value:node.attributes[i].value});
            }
            return jsonAttributes;
        },
        convertXmlToJson:function(options, fncXml){
            var xml = options.xml;
            var returnObjJson = {};
            var obj = {};
            var nodeName = null;

            if(!!xml.documentElement){
                nodeName = fncXml.getTagName(xml.documentElement);
                obj[nodeName] = {}; // {"resume":{}}
                fncXml.getNextElement(xml.documentElement);
            }



            returnObjJson = obj;
            return returnObjJson;

        }  // End convertXmlToJson

    }; // End _fnc

    return{fnc:_fnc, ObjXml:ObjXml}
})();