var utils = require('util');
var EventEmitter = require('events').EventEmitter;

/**
 * Token assertions class.
 *
 * @name {TokenAssert}
 */
function TokenAssert() {
    EventEmitter.call(this);
}

utils.inherits(TokenAssert, EventEmitter);

/**
 * Requires to have whitespace between specified tokens.
 *
 * @param {Object} token
 * @param {Object} nextToken
 * @param {String} message
 */
TokenAssert.prototype.whitespaceBetween = function(token, nextToken, message) {
    if (nextToken.range[0] === token.range[1]) {
        this.emit('error', {
            message: message,
            line: token.loc.end.line,
            column: token.loc.end.column
        });
    }
};

/**
 * Requires to have no whitespace between specified tokens.
 *
 * @param {Object} token
 * @param {Object} nextToken
 * @param {String} message
 * @param {Boolean} [disallowNewLine=false]
 */
TokenAssert.prototype.noWhitespaceBetween = function(token, nextToken, message, disallowNewLine) {
    if (nextToken.range[0] !== token.range[1] &&
        (!disallowNewLine && token.loc.end.line === nextToken.loc.start.line)
    ) {
        this.emit('error', {
            message: message,
            line: token.loc.end.line,
            column: token.loc.end.column
        });
    }
};

module.exports = TokenAssert;
