//const pdfjs = require('pdfjs');
//console.log(pdfjs.version);

// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
//var url = '//cdn.mozilla.net/pdfjs/helloworld.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
//pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
//pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';

//pdfjsLib.workerPort = (pdfjsLib.GlobalWorkerOptions.workerPort === undefined ? null : pdfjsLib.GlobalWorkerOptions.workerPort);

document.addEventListener('DOMContentLoaded', function(event) {
	/**
	 * Asynchronously downloads PDF.
	 */
	(function() {
		var pdfDoc = null,
			pageNum = 1,
			pageRendering = false,
			pageNumPending = null,
			scale = 0.8;

		var pdfUrls = {
			url1: 'http://localhost:4242/pdf1',
			url2: 'http://localhost:4242/pdf2',
			url3: 'http://localhost:4242/pdf3',
		};

		function PdfJsObj(pdfUrl, pageNum, section) {
			this.pdfUrl = pdfUrl;
			this.pageNum = pageNum;
			this.section = section;
			this.pdfDoc = null;
			this.callPDF = function() {
				var _this = this;
				pdfjsLib.getDocument(pdfUrl).promise.then(function(pdfDoc_) {
					_this.pdfDoc = pdfDoc_;
					_this.renderPage(_this.pageNum);
				});
			};
			this.renderPage = function(pageNum) {
				var _this = this;
				var mainContainer = document.getElementById('panel-' + section);
				var container = document.getElementById(
					'pdf-container-' + section
				);
				this.pdfDoc.getPage(pageNum).then(function(page) {
					//var viewport = page.getViewport(scale);
					var section = _this.section;

					// Prepare canvas using PDF page dimensions
					var canvas = document.createElement('canvas');
					canvas.setAttribute(
						'id',
						'the-canvas-' + section + '-' + pageNum
					);
					container.append(canvas);
					/*var viewport = page.getViewport(
						document.getElementsByClassName('pdf-container')[0]
							.offsetWidth / page.getViewport(scale).width
					);*/
					//var viewport = page.getViewport(scale);
					var context = canvas.getContext('2d');

					var desiredWidth = mainContainer.parentElement.offsetWidth;
					var viewport = page.getViewport(1.0);
					var scaleX = desiredWidth / viewport.width;
					var scaledViewport = page.getViewport(scaleX);
					console.log('scale: ', scale, ' scaleX: ', scaleX);
					canvas.height = scaledViewport.height;
					canvas.width = scaledViewport.width;
					// Render PDF page into canvas context
					var renderContext = {
						canvasContext: context,
						viewport: scaledViewport,
					};
					var renderTask = page.render(renderContext);
					console.log('pdfDoc.currentPage: ', pageNum);
					// Wait for rendering to finish
					renderTask.promise.then(function() {
						if (pageNum < _this.pdfDoc.numPages) {
							pageNumPending = pageNum + 1;
							_this.renderPage(pageNumPending);
						}
					});
				});
			};
		}

		function createPDF(pdfUrl, pageNum, section) {
			PdfJsObj.call(this, pdfUrl, pageNum, section);
			console.log('Logging from function call #' + pdfUrl);
		}

		createPDF.prototype = Object.create(PdfJsObj.prototype);
		createPDF.prototype.constructor = createPDF;

		var pdf1 = new createPDF(pdfUrls.url1, pageNum, 'first');
		var pdf2 = new createPDF(pdfUrls.url2, pageNum, 'second');
		var pdf3 = new createPDF(pdfUrls.url3, pageNum, 'third');

		setTimeout(pdf1.callPDF(), 0);
		//setTimeout(pdf2.callPDF(), 0);
		//setTimeout(pdf3.callPDF(), 0);
	})();

	/*function delayedLog(index, delay) {
		setTimeout(function() {
			console.log('Logging from function call #' + index);
		}, delay);
	}

	delayedLog(1, 2000);
	delayedLog(2, 1000);*/

	/*pdfjsLib.getDocument(pdfUrls.url1).then(function(pdfDoc_) {
		pdfDoc = pdfDoc_;
		renderPage(pageNum, 'first');
	});
	pdfjsLib.getDocument(pdfUrls.url2).then(function(pdfDoc_) {
		pdfDoc = pdfDoc_;
		renderPage(pageNum, 'second');
	});
	pdfjsLib.getDocument(pdfUrls.url3).then(function(pdfDoc_) {
		pdfDoc = pdfDoc_;
		renderPage(pageNum, 'third');
	});*/

	/*document.getElementById("loadPDf").addEventListener("click", function() {
    console.log("button clicked", this.getAttribute("action"));
  });
  var newCanvas = document.createElement("canvas");
  newCanvas.setAttribute("id", "the-canvas");
  newCanvas.setAttribute("class", "blockItem");
  var bottomDiv = document.getElementById("bottom");
  document.body.insertBefore(newCanvas, bottomDiv);*/
});
