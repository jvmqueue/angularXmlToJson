var jvm = jvm || {}

jvm.requestHttp = (function($){

    var _fnc = {

        request:function(options){
            var headers = options.hashHeaders || '';
            var url = options.url;
            return $.ajax({
                url:url,
                method:'POST',
                headers:headers,
                dataType:'xml',
                complete:function(data){
                   options.returnData.call(this, {data:data}); 
                }                
            });
        }

    }; // End _func

    return{
        fnc:_fnc
    }

})(jQuery);