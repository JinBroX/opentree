const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\xujin\\Documents\\00 opentree';
const destDir = path.join(__dirname, 'public');

fs.copyFileSync(path.join(srcDir, 'opentree-logo-01.png'), path.join(destDir, 'opentree-logo-01.png'));
console.log('Logo 01 copied');

fs.copyFileSync(path.join(srcDir, 'opentree-logo-02.png'), path.join(destDir, 'opentree-logo-02.png'));
console.log('Logo 02 copied');

console.log('Done!');
