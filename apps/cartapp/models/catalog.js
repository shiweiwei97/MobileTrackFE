/* jslint node: true */

"use strict";

function Catalog() {

    var _catalog = [];

    for (var i = 1; i < 9; i++) {
        _catalog.push({
            "id": 'Widget' + i,
            "title": 'Widget #' + i,
            "cost": i
        });
    }

    this.getCatalog = function () {
        return _catalog;
    };
}

module.exports = Catalog;