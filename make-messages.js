const fs        = require('fs');
const showdown  = require('showdown');
const minify    = require('html-minifier').minify;
const converter = new showdown.Converter({
    tasklists: true,
    simplifiedAutoLinks: true,
    literalMidWordUnderscores: true,
    tables: true,
});

function main() {
    if (process.argv.length != 3) {
        console.log('USAGE: node make-messages.js <markdown file>');
        return;
    }

    const filename = process.argv[2];
    if (!fs.existsSync(filename)) {
        console.log(filename + " doesn't seem to exist. Try checking the path and current directory.");
        return;
    }

    if (filename.substring(filename.indexOf('.')) != '.md') {
        console.log('Must supply a markdown file');
        return;
    }

    const markdown = fs.readFileSync(filename, "utf8");
    const html     = converter.makeHtml(markdown);
    let   minified = minify(html, {
        collapseWhitespace: true,
        quoteCharacter: "'",
        removeComments: true,
    });

    minified = minified.replace(/\r?\n|\r/g, '');   // remove newlines and carriage returns
    minified = minified.replace('"', "'");          // replace double quotes with single

    filenameNoExtension = filename.substring(0, filename.indexOf('.'));
    fs.writeFileSync(filenameNoExtension + '.html',      html);
    fs.writeFileSync(filenameNoExtension + '_mini.html', minified);
}

main();
