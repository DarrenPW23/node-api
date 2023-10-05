/* A file for all your JS extensions that will be globally used */

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp("\\" + search, 'g'), replacement);
}