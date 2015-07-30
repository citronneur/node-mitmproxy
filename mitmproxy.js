var http = require('http');
var colors = require('colors');


return http.createServer()
.on('request', function (clientRequest, clientResponse) {
	http.request({
		hostname: clientRequest.headers.host,
		path: clientRequest.url,
		headers: clientRequest.headers
	})
	.on('response', function (serverResponse) {
		
		// log requests
		console.log(clientRequest.method.green + ' ' + clientRequest.url);
		console.log(serverResponse.statusCode.toString().blue + ' ' + (serverResponse.headers['content-length'] || '??').white + 'Bytes');

		clientResponse.writeHead(serverResponse.statusCode, serverResponse.headers);
		serverResponse.on('data', function (chunk) {
			clientResponse.write(chunk);
		})
		.on('end', function () {
			clientResponse.end();
		});
	})
	.end();
})
.listen(8080);
