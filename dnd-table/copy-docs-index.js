const fs = require('fs');

const indexSource = './docs/index.html';
const copyDestination = './docs/404.html';

fs.copyFileSync(indexSource, copyDestination);
console.log(`${indexSource} file copied to ${copyDestination}`);
