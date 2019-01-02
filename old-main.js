//var pdfjsLib = require('pdfjs-dist');

//console.log(pdfjsLib.version);

//import * as PDFJS from 'pdfjs-dist/webpack.js';

//import { PDFJS } from 'pdfjs-dist/web/pdf_viewer.js';

//console.log(PDFJS.version);

// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

// Hello world example for webpack.

// https://stackoverflow.com/questions/48323206/webpack-how-to-combine-0-bundle-with-main-bundle-pdfjs
//

var pdfjsLib = require('pdfjs-dist');

var pdfPath = '../helloworld/helloworld.pdf';

// Setting worker path to worker bundle.
pdfjsLib.GlobalWorkerOptions.workerSrc =
	'../../build/webpack/pdf.worker.bundle.js';

// Loading a document.
var loadingTask = pdfjsLib.getDocument(pdfPath);
loadingTask.promise
	.then(function(pdfDocument) {
		// Request a first page
		return pdfDocument.getPage(1).then(function(pdfPage) {
			// Display page on the existing canvas with 100% scale.
			var viewport = pdfPage.getViewport({ scale: 1.0 });
			var canvas = document.getElementById('theCanvas');
			canvas.width = viewport.width;
			canvas.height = viewport.height;
			var ctx = canvas.getContext('2d');
			var renderTask = pdfPage.render({
				canvasContext: ctx,
				viewport: viewport,
			});
			return renderTask.promise;
		});
	})
	.catch(function(reason) {
		console.error('Error: ' + reason);
	});
