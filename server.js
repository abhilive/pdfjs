const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', express.static('web/myweb/'));
/*app.get('/', function (req,res) {
     res.sendFile(path.join(__dirname + '/web/myweb/index.html'));
});*/

app.listen(PORT, () => {
	console.log(`App is listening on port: ${PORT}`);
});

/* Node Way to handle request */
const fs = require('fs');
const http = require('http');
const url = require('url');

var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };

const fileServer = http.createServer((req, res) => {
	// Set CORS header
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', 'Range');
	res.setHeader(
		'Access-Control-Expose-Headers',
		'Accept-Ranges, Content-Encoding, Content-Length, Content-Range'
	);
	var path = url.parse(req.url).pathname;
	switch (path) {
		case '/pdf1':
			/* const data = fs.readFileSync('./web/pdfs/helloworld.pdf', 'utf-8');   
                res.end(data); */
			/*try {
				setTimeout(() => {
					var file = fs.createReadStream(
						'./web/pdfs/compressed.tracemonkey-pldi-09.pdf'
					);
					res.writeHead(200, {
						'Content-Type': 'application/pdf',
					});
					file.pipe(res);
				}, 5 * 1000);
			} catch (err) {
				if (err.code === 'ENOENT') {
					console.log('file not found.');
				} else {
					throw err;
				}
      }*/
			var file = fs.createReadStream(
				'./web/pdfs/compressed.tracemonkey-pldi-09.pdf'
			);
			res.writeHead(200, {
				'Content-Type': 'application/pdf',
			});
			file.pipe(res);
			break;
		case '/pdf2':
			var file = fs.createReadStream('./web/pdfs/pdf2.pdf');
			res.writeHead(200, {
				'Content-Type': 'application/pdf',
			});
			file.pipe(res);
			break;
		case '/pdf3':
			var file = fs.createReadStream('./web/pdfs/pdf3.pdf');
			res.writeHead(200, {
				'Content-Type': 'application/pdf',
			});
			file.pipe(res);
			break;
		default:
			res.writeHead(404);
			res.write("opps this doesn't exist - 404");
			res.end();
			break;
	}
});

fileServer.listen(4242, () => {
	console.log(`File server is running on port ${fileServer.address().port}.`);
});
