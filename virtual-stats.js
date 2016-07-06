/**
 * Used to cache a stats object for the virtual file.
 * Extracted from the `mock-fs` package.
 *
 * @author Tim Schaub http://tschaub.net/
 * @link https://github.com/tschaub/mock-fs/blob/master/lib/binding.js
 * @link https://github.com/tschaub/mock-fs/blob/master/license.md
 */

'use strict';

var constants = process.binding('constants');

var VirtualStats = function VirtualStats(config) {
  var this$1 = this;

  for (var key in config) {
    if (!config.hasOwnProperty(key)) {
      continue;
    }
    this$1[key] = config[key];
  }
};

/**
 * Check if mode indicates property.
 * @param {number} property Property to check.
 * @return {boolean} Property matches mode.
 */
VirtualStats.prototype._checkModeProperty = function _checkModeProperty (property) {
  return ((this.mode & constants.S_IFMT) === property);
};


/**
 * @return {Boolean} Is a directory.
 */
VirtualStats.prototype.isDirectory = function isDirectory () {
  return this._checkModeProperty(constants.S_IFDIR);
};


/**
 * @return {Boolean} Is a regular file.
 */
VirtualStats.prototype.isFile = function isFile () {
  return this._checkModeProperty(constants.S_IFREG);
};


/**
 * @return {Boolean} Is a block device.
 */
VirtualStats.prototype.isBlockDevice = function isBlockDevice () {
  return this._checkModeProperty(constants.S_IFBLK);
};


/**
 * @return {Boolean} Is a character device.
 */
VirtualStats.prototype.isCharacterDevice = function isCharacterDevice () {
  return this._checkModeProperty(constants.S_IFCHR);
};


/**
 * @return {Boolean} Is a symbolic link.
 */
VirtualStats.prototype.isSymbolicLink = function isSymbolicLink () {
  return this._checkModeProperty(constants.S_IFLNK);
};


/**
 * @return {Boolean} Is a named pipe.
 */
VirtualStats.prototype.isFIFO = function isFIFO () {
  return this._checkModeProperty(constants.S_IFIFO);
};


/**
 * @return {Boolean} Is a socket.
 */
VirtualStats.prototype.isSocket = function isSocket () {
  return this._checkModeProperty(constants.S_IFSOCK);
};

module.exports = VirtualStats;
