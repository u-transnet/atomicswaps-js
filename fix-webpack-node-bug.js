var fs = require('fs');
var util = require('util');

var dir = "./dist/";
var buildFiles = ["build.node.js", "build.node.min.js"].map(function (name) {
    return dir + name;
});

var modules = ["scrypt", "websocket"];
var template = "var %s = require('%s');";

buildFiles.forEach(function (path) {
    if (!fs.existsSync(path))
        return;
    var str = modules.map(function (moduleName) {
        return util.format(template, moduleName, moduleName);
    }).join("\n");


    var fileContent = fs.readFileSync(path).toString();
    var fd = fs.openSync(path, 'w+');
    fs.writeFileSync(fd, str + '\n' + fileContent);
    fs.closeSync(fd);
});
