var inCode = false;
var codeChunk = '';

var myext = {
    type: 'output',
    regex: new RegExp('.*', 'g'),
    replace: function (text) {

        if (text.startsWith('</code>')) {
            eval(codeChunk); // TODO dispatch to a different fn based on the type of code block
            codeChunk = '';
            inCode = false;
        }

        if (inCode) {
            codeChunk += text + '\n';
        } else if (text.startsWith('<pre><code>')) {
            inCode = true;
            codeChunk += text.substring('<pre><code>'.length) + '\n';
        }

        return text;
    }
};

function run() {
    // TODO check how to load dynamically by loading an external file, like:
    //   var file = document.location.search.substring(6);
    //   document.writeln("<script type='text/markdown' src='" + file + "'><" + "/script>");

    showdown.extension('myext', myext); // register extension 'myext'

    var text = document.scripts[0].text, // TODO filter scripts of type 'text/markdown'
        target = document.getElementById('targetDiv'),
        converter = new showdown.Converter({ extensions: ['myext'] }),
        html = converter.makeHtml(text);

    target.innerHTML = html;
}

run();