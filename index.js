'use strict';

var VirtualStats = require('./virtual-stats');

var VirtualModulePlugin = function VirtualModulePlugin(options) {
  this.options = options;
};

VirtualModulePlugin.prototype.apply = function apply (compiler) {
  var moduleName = this.options.moduleName;
  var contents = this.options.contents;
  var ctime = VirtualModulePlugin.statsDate();
  var modulePath = this.options.path;

  compiler.resolvers.normal.plugin('resolve', function resolverPlugin(request, cb) {
    // populate the file system cache with the virtual module
    var fs = this.fileSystem;

    // webpack 1.x compatibility
    if (typeof request === 'string') {
      request = cb;
      cb = null;
    }

    if (!modulePath) {
      modulePath = this.join(compiler.context, moduleName);
    }
    VirtualModulePlugin.populateFilesystem({ fs: fs, modulePath: modulePath, contents: contents, ctime: ctime });
    if (cb) {
      cb();
    }
  });
};

VirtualModulePlugin.populateFilesystem = function populateFilesystem (options) {
  var fs = options.fs;
  var modulePath = options.modulePath;
  var contents = options.contents;
  if (fs._readFileStorage.data[modulePath]) {
    return;
  }
  var stats = VirtualModulePlugin.createStats(options);
  fs._statStorage.data[modulePath] = [null, stats];
  fs._readFileStorage.data[modulePath] = [null, contents];
};

VirtualModulePlugin.statsDate = function statsDate (inputDate) {
  if (!inputDate) {
    inputDate = new Date();
  }
  return inputDate.toString();
};

VirtualModulePlugin.createStats = function createStats (options) {
  if (!options) {
    options = {};
  }
  if (!options.ctime) {
    options.ctime = VirtualModulePlugin.statsDate();
  }
  if (!options.mtime) {
    options.mtime = VirtualModulePlugin.statsDate();
  }
  if (!options.size) {
    options.size = 0;
  }
  if (!options.size && options.contents) {
    options.size = options.contents.length;
  }
  return new VirtualStats({
    dev: 8675309,
    nlink: 1,
    uid: 501,
    gid: 20,
    rdev: 0,
    blksize: 4096,
    ino: 44700000,
    mode: 33188,
    size: options.size,
    atime: options.mtime,
    mtime: options.mtime,
    ctime: options.ctime,
    birthtime: options.ctime,
  });
};

module.exports = VirtualModulePlugin;
