const fs        = require('fs');
const showdown  = require('showdown');
const minify    = require('html-minifier').minify;
const converter = new showdown.Converter();

function main() {
    if (process.argv.length != 3) {
        console.log("USAGE: node make-messages.js <markdown file>");
        return;
    }

    const filename = process.argv[2];

    const markdown = fs.readFileSync(filename, "utf8");
    const html     = converter.makeHtml(markdown);
    let   minified   = minify(html, {
        collapseWhitespace: true,
        quoteCharacter: "'",
        removeComments: true,
    });

    minified = minified.replace(/\r?\n|\r/g, '');   // remove newlines and carriage returns
    minified = minified.replace('"', "'");          // replace double quotes with single

    filenameNoExtension = filename.substring(0, filename.indexOf('.'));
    fs.writeFileSync(filenameNoExtension + '_html.html', html);
    fs.writeFileSync(filenameNoExtension + '_minified.html', minified);
}

main();
