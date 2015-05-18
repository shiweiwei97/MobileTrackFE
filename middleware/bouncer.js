/* jslint node: true */

module.exports = function () {

    return function (req, res, next) {
        req.userid = 'weiwei';
        next();
    };
};
