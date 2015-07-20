var mitmproxy = require('../lib');

mitmproxy.createMitmProxy([mitmproxy.hook.console]).listen(8080);
