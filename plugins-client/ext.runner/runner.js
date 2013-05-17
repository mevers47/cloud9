/**
 * Runner extension for Cloud9 IDE
 *
 * The runner extension can run any development tool in any environment. It
 * delegates the process of running the actual tools to the server. The server
 * must therefore know how to run specific tools.
 *
 * Runner:
 *   Main responsibility is to track server state.
 *
 * Runtime:
 *   Main responsibility is to track tool runtime state.
 *
 * @copyright 2013, Martijn Evers
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */
define(function(require, exports, module) {

var ext = require("core/ext");
var ide = require("core/ide");
//var commands = require("ext/commands/commands"); TODO: Add some handy commands!
var newRuntime = require("ext/runner/runtime");

module.exports = ext.register("ext/runner/runner", {
    name     : "Runner",
    dev      : "Martijn Evers",
    alone    : true,
    type     : ext.GENERAL,

    // private members (runner state)
    __environments : null,
    __currentEnv : null,
    __destroyed : null,
    __active : null,

    /**
     * Run a development tool.
     *
     * @param name {String} Name of the tool to run.
     * @param args {String[]} Arguments for the tool to run.
     * @return {Runtime} Runtime object.
     */
    run : function(name, args) {
        this.__checkState();
        if (! this.__currentEnv) {
            throw new Error("No environment known!");
        }

        var runtime = newRuntime(this.__currentEnv, name);
        runtime.run(args);
        return runtime;
    },

    /**
     * Returns the current environment.
     *
     * @param returns {Function} Called with arg0 as the current environment.
     */
    currentEnvironment : function(returns) {
        this.__checkState();

        returns(null);
    },

    /**
     * Switch development environment.
     *
     * @param env {String} The environment name.
     * @param returns {Function} Called with arg0 as null on success or any other type on error.
     */
    switchEnvironment : function(env, returns) {
        this.__checkState();

        // TODO: Ask the server to switch environment.
        // TODO: Define error.
        returns({code: null, msg: "Not implemented"});
    },

    /**
     * Get a list of available environments.
     *
     * @param returns {Function} Called with arg0 as an array of environments.
     */
    getEnvironments : function(returns) {
        this.__checkState();

        // TODO: Ask server for available environments.
        // TODO: Define environment, environments contain tools!
        returns([]);
    },

    init : function() {
        this.__destroyed = false;
        // TODO: Query the server for available environments.
    },

    hook : function() {
        // we need to be online, always!
        if (ide.readonly) {
            return;
        }

        ext.initExtension(this);
    },

    enable : function() {
        this.__active = true;
    },

    disable : function() {
        this.__active = false;
    },

    destroy : function() {
        this.__active = false;
        this.__destroyed = true;
    },

    __checkState : function() {
        if (true !== this.__active) {
            if (this.__destroyed) {
                throw new Error("This extension is destroyed!");
            } else {
                throw new Error("This extension is not active!");
            }
        }
    }
});

});