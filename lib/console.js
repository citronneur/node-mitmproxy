var colors = require('colors');
module.exports.proxy = function (clientRequest, serverResponse) {
	console.log(clientRequest.method.green + ' ' + clientRequest.url);
	console.log(serverResponse.statusCode.toString().blue + ' ' + (serverResponse.headers['content-length'] || '??').white + 'Bytes');
}