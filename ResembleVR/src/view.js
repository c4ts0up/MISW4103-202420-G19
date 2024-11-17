const config = require("../config.json");
const { viewportHeight, viewportWidth, browsers, options } = config;

function browser(b, info, imageNames){
    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h3>Browser: ${b}</h3>
    </div>
    ${imageNames.map((im)=>state(im, info[im]))}
  </div>`
}

function state(imageName, info) {
    return `
    <h4>Screenshot identifier: ${imageName}</h4>
    <p>Data: ${JSON.stringify(info)}</p>
    <div class="imgline">
        <div class="imgcontainer">
            <span class="imgname">Reference</span>
            <img class="img2" src="base-${imageName}" id="refImage" label="Reference">
        </div>
        <div class="imgcontainer">
            <span class="imgname">Test</span>
            <img class="img2" src="rc-${imageName}" id="testImage" label="Test">
        </div>
    </div>
    <div class="imgline">
        <div class="imgcontainer">
            <span class="imgname">Diff</span>
            <img class="imgfull" src="compare-${imageName}" id="diffImage" label="Diff">
        </div>
    </div>`
}


function createReport(currentBrowser, id, resInfo, imageNames){
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 <a href="${config.url}"> ${config.url}</a>
            </h1>
            <h2>Executed: ${id}</h2>
            <div id="visualizer">
                ${browser(currentBrowser, resInfo, imageNames)}
            </div>
        </body>
    </html>`
}

module.exports = {
    createReport
}