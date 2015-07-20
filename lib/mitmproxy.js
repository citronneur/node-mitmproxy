var http = require('http');

function createMitmProxy(plugins) {
	return http.createServer( function (clientRequest, clientResponse) {
			if (clientRequest.headers.host) {
				var serverRequest = http.request({
					hostname: clientRequest.headers.host,
					port: 80,
					path: clientRequest.url,
					headers: clientRequest.headers
				}, function (serverResponse) {
					plugins.forEach( function (plugin) {
						plugin.proxy(clientRequest, serverResponse);
					});
					clientResponse.writeHead(serverResponse.statusCode, serverResponse.headers);
					serverResponse.on('data', function (chunk) {
						clientResponse.write(chunk);
					}).on('end', function () {
						clientResponse.end();
					});
				});
				serverRequest.end();
			}
		});
}

module.exports = {
		createMitmProxy: createMitmProxy
}