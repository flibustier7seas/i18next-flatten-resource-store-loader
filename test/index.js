/* eslint-env node */

var chai = require("chai");
var path = require("path");
var loader = require("../index");

const assert = chai.assert;

describe("loader", function () {
    beforeEach(function (done) {
        var emptFn = function () {};
        //mock webpack loader this scope
        this.Scope = {
            addDependency: emptFn,
            addContextDependency: emptFn,
            cacheable: emptFn,
            resource: path.join(__dirname, "locales/index.js"),
        };
        done();
    });

    afterEach(function (done) {
        done();
    });

    it("should generate a translations object", function () {
        var bundle = loader.call(this.Scope, "index.js");
        var translations = eval(bundle);

        assert.property(translations, "en");
        assert.property(translations["en"], "first.first");
        assert.equal(translations["en"]["first.first"], "first");
        assert.property(translations["en"], "second.second.second");
        assert.equal(translations["en"]["second.second.second"], "second");

        assert.property(translations, "ru");
        assert.property(translations["ru"], "first.first");
        assert.equal(translations["ru"]["first.first"], "первый");
        assert.property(translations["ru"], "second.second.second");
        assert.equal(translations["ru"]["second.second.second"], "второй");
    });
});