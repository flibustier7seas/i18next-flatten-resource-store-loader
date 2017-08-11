/* eslint-env node */

var fs = require("fs");
var path = require("path");
var flatten = require("flat");

// https://github.com/webpack/docs/wiki/how-to-write-a-loader
module.exports = function () {
    this.cacheable && this.cacheable();

    var baseDirectory = path.dirname(this.resource);
    this.addContextDependency(baseDirectory);

    var languageDefiningDirectories = fs.readdirSync(baseDirectory).filter(function (file) {
        return fs.statSync(path.join(baseDirectory, file)).isDirectory();
    });

    var translations = {};

    languageDefiningDirectories.forEach(function (directory) {
        translations[directory] = getTranslationsFromDirectory(path.join(baseDirectory, directory));
    });

    var bundle = Object.keys(translations).reduce((messages, locale) => {
        messages[locale] = flatten(translations[locale]);
        return messages;
    }, {});

    return "module.exports = " + JSON.stringify(bundle);
};

function getTranslationsFromDirectory(directoryPath) {
    var result = {};

    var childrens = fs.readdirSync(directoryPath);

    childrens.forEach(function (children) {
        var childrenPath = path.join(directoryPath, children);

        if (fs.statSync(childrenPath).isFile()) {
            var extName = path.extname(childrenPath);
            var baseName = path.basename(childrenPath, extName);

            result[baseName] = JSON.parse(fs.readFileSync(childrenPath));
        } else {
            result[children] = getTranslationsFromDirectory(childrenPath);
        }
    });

    return result;
}
