(function(){

    var module = angular.module('editAdoc.service.converter', []);

    /**
    *  This is the old converter which was used to render the HTML produced by asciidoctor.js
    *   into an IFrame.
    */
    module.service("Converter", function Converter(){

        function getHTML5(asciidocSource){
            var asciidoctorOptions = "Opal.hash2(['attributes'], {'attributes': '" + buildAsciidoctorOptions() + "' }) ";
            var strVar="";
            strVar += "<!DOCTYPE html>";
            strVar += "  <html>";
            strVar += "  <head>";
            strVar += "    <meta http-equiv=\"Content-Type\" content=\"text\/html; charset=UTF-8\">";
            strVar += "    <title>Asciidoctor in JavaScript powered by Opal<\/title>";
            strVar += "    <link rel=\"stylesheet\" href=\"bower_components\/asciidoctor.js\/dist\/css\/asciidoctor.css\">";
            strVar += "  <\/head>";
            strVar += "  <body>";
            strVar += "    <div id=\"content\">";
            strVar += "    <\/div>";
            strVar += "    <script src=\"bower_components\/asciidoctor.js\/dist\/asciidoctor-all.min.js\"><\/script>";
            strVar += "    <script>";
            strVar += "      var generatedHtml = undefined;";
            strVar += "      try{ ";
            strVar += "      		asciidoctorDocument = Opal.Asciidoctor.$convert(\"";
            strVar += stringEncode(asciidocSource) ;
            strVar += "\", ";
            strVar += asciidoctorOptions;
            strVar += ");";
            strVar += "			   generatedHtml = asciidoctorDocument;";
            strVar += "		 }catch (e) {generatedHtml='Rendering error : ' + e.name + ':' + e.message};";
            strVar += "      document.getElementById('content').innerHTML = generatedHtml;";
            strVar += "    <\/script>";
            strVar += "  <\/body>";
            strVar += "<\/html>";
            strVar += "";
            return strVar;

        };

        /**
         * Build Asciidoctor options
         */
        function buildAsciidoctorOptions(items) {
            var customAttributes = '';
            if (items){
                customAttributes = items['CUSTOM_ATTRIBUTES_KEY'];
            }
            var defaultAttributes = 'showtitle toc2 showauthor icons=font@';
            if (customAttributes) {
                attributes = defaultAttributes.concat(' ').concat(customAttributes);
            } else {
                attributes = defaultAttributes;
            }
            return attributes;
        };

        function stringEncode(preescape) {
            var escaped="";
            var i=0;
            for(i=0;i<preescape.length;i++)
            {
                escaped=escaped+encodeCharx(preescape.charAt(i));
            }
            return escaped;
        };


        function encodeCharx(original) {
            var hex=new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');
            var found=true;
            var thecharchar=original.charAt(0);
            var thechar=original.charCodeAt(0);
            switch(thecharchar) {
                case '\n': return "\\n"; break; //newline
                case '\r': return "\\r"; break; //Carriage return
                case '\'': return "\\'"; break;
                case '"': return "\\\""; break;
                case '\&': return "\\&"; break;
                case '\\': return "\\\\"; break;
                case '\t': return "\\t"; break;
                case '\b': return "\\b"; break;
                case '\f': return "\\f"; break;
                case '/': return "\\x2F"; break;
                case '<': return "\\x3C"; break;
                case '>': return "\\x3E"; break;
                default:
                    found=false;
                    break;
            }
            if(!found)
            {
                if(thechar>127) {
                    var c=thechar;
                    var a4=c%16;
                    c=Math.floor(c/16);
                    var a3=c%16;
                    c=Math.floor(c/16);
                    var a2=c%16;
                    c=Math.floor(c/16);
                    var a1=c%16;
                    //	alert(a1);
                    return "\\u"+hex[a1]+hex[a2]+hex[a3]+hex[a4]+"";
                }
                else
                {
                    return original;
                }
            }
        };

        this.getHTML5 = getHTML5;

    });

})();
