var fs = require('fs');

var wsl = fs.createWriteStream('1.txt', 'utf-8');
wsl.write('words');
wsl.write('end');
wsl.end();

var ws2 = fs.createWriteStream('2.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end();