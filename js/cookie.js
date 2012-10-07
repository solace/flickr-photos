(function($, undefined) {
    /**
     * Simplified cookie plugin.
     *
     * Path, domain, security and expiry requirements were not specified.
     * This plugin can be modified to support these options.
     *
     * Note: Chrome does not support cookies for local files (and possibly
     * localhost). If you wish to test this locally, you will need to use
     * 127.0.0.1, or set up a host on your local machine.
     *
     * @param name
     * @param value
     */
    $.browserCookie = function(name,value) {
        try {
            if (name == undefined)
                throw "Error: Cookie name is required.";

            name = $.trim(name);

            // No value, get cookie
            if (value == undefined) {
                var cval;
                var cookies = document.cookie.split(';');

                name += '=';

                for (var i=0;i<cookies.length;i++) {
                    var cookie = $.trim(cookies[i]);
                    if (cookie.substring(0,name.length) == name) {
                        cval = decodeURIComponent(cookie.substr(name.length));
                        break;
                    }
                }
                return cval;
            }
            // Value provided, set cookie
            else {
                document.cookie = name + '=' + encodeURIComponent(value);
            }
        }
        catch(error) {
            console.log(error);
        }
    };
})(jQuery);