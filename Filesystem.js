'use strict';

function Filesystem (fs) {
  this.fs = fs;
}

Filesystem.prototype.get = function(path) {
  return this.fs.readFileSync(path, 'utf8');
};

module.exports = Filesystem;
