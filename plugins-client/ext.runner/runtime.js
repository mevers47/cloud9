/**
 * Runtime module for the Runner extension for Cloud9 IDE
 *
 * @copyright 2013, Martijn Evers
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */
define(function () {

    /**
     * Creates a runtime for the given tool.
     */
    var Runtime = function(env, tool) {

        // public members
        this.running = false;
        this.env = env;
        this.tool = tool;

        // private members
        // TODO: use tool te communicate with the server.
    };

    /**
     * Run this tool.
     *
     * @param args {String[]} Array of arguments for the tool to run.
     * @param returns {Function} Called with arg0 true on success or false on error.
     * @throws {Error} If already running. The user should check 'running' before calling this!
     */
    Runtime.prototype.run = function(args, returns) {
        if (this.running) {
            throw new Error("The " + this.env + " " + this.tool + " is already running!");
        }

        // TODO: Signal server to run the tool.
        if ('function' === typeof returns) {
            returns(false);
        }
    };

    /**
     * Stop this tool from running.
     */
    Runtime.prototype.stop = function(returns) {
        // TODO: Signal server to stop the tool.
        if ('function' === typeof returns) {
            returns(false);
        }
    };

    /**
     * Returns a runtime builder. By executing this builder function a new runtime is created.
     *
     * @param env {String} The name of the environment.
     * @param tool {String} The name of the tool.
     * @return {Runtime@ext/runner/runtime} Runtime object.
     */
    return function(env, tool) {
        return new Runtime(env, tool);
    }
});