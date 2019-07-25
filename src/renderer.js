var showdown = require("showdown");
var ts = require("typescript");

var inCode = false;
var codeChunk = '';
var consoleOutput = '';
const origConsole = console;

var myext = {
    type: 'output',
    regex: new RegExp('.*', 'g'),
    replace: function (text) {

        if (text.startsWith('</code>')) {
            consoleOutput = '';
            // capture console log - TODO debug, info, warn, error
            console.log = function (msg) { consoleOutput += msg + '\n'; };

            // inject ts compiler
            var result = ts.transpileModule(codeChunk, {
                compilerOptions: { module: ts.ModuleKind.CommonJS }
            });

            // eval typescript output
            // TODO dispatch to a different fn based on the type of code block
            eval(result.outputText);
            
            // restore the console
            console.log = origConsole.log;
            codeChunk = '';
            inCode = false;
        }

        if (inCode) {
            codeChunk += text + '\n';
        } else if (text.startsWith('<pre><code>')) {
            inCode = true;
            codeChunk += text.substring('<pre><code>'.length) + '\n';
        }

        if (!inCode && consoleOutput !== '') {
            const returnValue = text +
                "\n<div class='output-header'>Output:</div>" +
                "\n<pre class='console-log'><code>" + consoleOutput + '</code></pre>';
            consoleOutput = '';
            return returnValue;
        } else {
            return text;
        }
    }
};

/*
 * Renders the contents of a Markdown file
 */
function render(contents) {
    showdown.extension('myext', myext); // register the extension function 'myext'

    var text = contents,
        target = document.getElementById('targetDiv'),
        converter = new showdown.Converter({ extensions: ['myext'] }),
        html = converter.makeHtml(text);

    target.innerHTML = html;
}

/*
 * Loads the document in an Ajax call, calls the render function
 */
function run() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        render(this.responseText);
      }
    };
    var file = "demo.md";
    if (location.search !== '') {
        file = document.location.search.substring(6);
    }
    xhttp.open("GET", file, true);
    xhttp.send();
}

run();