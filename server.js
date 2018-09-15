const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/',express.static('web/myweb/'));
 /* app.get('/', function (req,res) {
     res.sendFile(path.join(__dirname + '/web/myweb/index.html'));
 }); */

 app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
 });

 /* Node Way to handle request */
const fs = require('fs');
//const pdf1 = require('./web/pdfs/pdf1');
//console.log(pdf1);
const http = require('http');
const url = require('url');
//const pdfmake = require('pdfmake');
var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };

const fileServer = http.createServer((req, res) => {
    // Set CORS header
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
    var path = url.parse(req.url).pathname;
    switch(path) {
        case '/pdf1':
            //var file = fs.createReadStream('./web/pdfs/helloworld.pdf');
            //var data = fs.readFileSync('./web/pdfs/helloworld.pdf');
            setTimeout(()=> {
                var file = fs.createReadStream('./web/compressed.tracemonkey-pldi-09.pdf');
                res.writeHead(200, {  
                    'Content-Type': 'application/pdf' 
                });
                file.pipe(res);
            }, 5*1000);
            //res.write("This is Test Message.");
            //res.end(data.toString('base64'));
            //res.end(data, 'binary');
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
