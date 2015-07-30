
//require('../lib').createMitmProxy([mitmproxy.hook.console]).listen(8080);
var http = require('http');
var https = require('https');
return http.createServer( function (clientRequest, clientResponse) {
	clientRequest.headers.host = 'github.com';
	var serverRequest = https.request({
		hostname: 'github.com',
		path: clientRequest.url,
		headers: clientRequest.headers,
		rejectUnauthorized: false
	}, function (serverResponse) {
		clientResponse.writeHead(serverResponse.statusCode, serverResponse.headers);
		serverResponse.on('data', function (chunk) {
			clientResponse.write(chunk);
		}).on('end', function () {
			clientResponse.end();
		});
	});
	serverRequest.end();
}).listen(8080);
