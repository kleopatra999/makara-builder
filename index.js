"use strict";

var path = require('path');
var glob = require('glob');
var async = require('async');

module.exports = function build(appRoot, writer, cb) {
    var localeRoot = path.resolve(appRoot, 'locales');

    glob(path.resolve(localeRoot, '*/*/'), function (err, paths) {
        if (err) {
            return cb(err);
        }
        var locales = paths.map(function (p) {
            var m = /(.*)\/(.*)/.exec(path.relative(localeRoot, p));

            return m[2] + '-' + m[1];
        });
        async.each(locales, writer, cb);
    });

};