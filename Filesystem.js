'use strict';

var path = require('path');

function Filesystem (filesystem) {
  this.fs = filesystem || require('fs');
}

Filesystem.prototype.get = function(path) {
  return this.fs.readFileSync(path, 'utf8');
};

/**
 * Get list of files recursively.
 *
 * @param  {String} dir    Path to source directory
 * @return {Array}         List of files
 */
Filesystem.prototype.getFiles = function(dir, files_) {
  files_ = files_ || [];
  var files = this.fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + '/' + files[i];
    if (this.fs.statSync(name).isDirectory()) {
      this.getFiles(name, files_);
    } else if (name.match(/\.js(?:on)?$/i)) {
      // for OS compatibility. On windows all '/' and '\' will convert to '\'.
      name = path.normalize(name);
      files_.push(name);
    }
  }
  return files_;
};

module.exports = Filesystem;
