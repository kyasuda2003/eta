(function() {
  var exitHandler, httpProxy, _api_port, _app_port;

  _api_port = 8000;

  _app_port = 9000;

  exitHandler = function(options, err) {
    if (options.cleanup) {
      console.log("\nclean");
    }
    if (err) {
      console.log("\n" + err.stack);
    }
    if (options.exit) {
      process.exit();
    }
  };

  httpProxy = require("http-proxy");

  httpProxy.createServer({
    target: {
      host: "localhost",
      port: _api_port
    }
  }).listen(_app_port);

  console.log("The app begins to listen on port#" + _app_port + " and to forward any request to port#" + _api_port);

  process.stdin.resume();

  process.on("exit", exitHandler.bind(null, {
    cleanup: true
  }));

  process.on("SIGINT", exitHandler.bind(null, {
    exit: true
  }));

  process.on("uncaughtException", exitHandler.bind(null, {
    exit: true
  }));

}).call(this);
