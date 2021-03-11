const fs = require('fs');
const path = require('path');

const buildDirectory = 'build';

let concatenatedCode = '';

fs.readdirSync(buildDirectory).forEach((file) => {
  const fileContent = fs.readFileSync(path.join(buildDirectory, file));
  concatenatedCode += fileContent + '\n';
});

fs.writeFileSync('index.js', concatenatedCode);

const minify = require('minify');
minify('index.js').then((result) => fs.writeFileSync('index.min.js', result));
