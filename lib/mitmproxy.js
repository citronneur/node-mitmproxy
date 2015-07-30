var http = require('http');

function createMitmProxy() {
	return http.createServer()
	.on('request', function (clientRequest, clientResponse) {
		http.request({
			hostname: clientRequest.headers.host,
			path: clientRequest.url,
			headers: clientRequest.headers
		})
		.on('request', function (serverResponse) {
			clientResponse.writeHead(serverResponse.statusCode, serverResponse.headers);
			serverResponse.on('data', function (chunk) {
				clientResponse.write(chunk);
			}).on('end', function () {
				clientResponse.end();
			});
		})
		.end();
	});
}

module.exports = {
		createMitmProxy: createMitmProxy
}