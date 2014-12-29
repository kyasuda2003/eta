(function() {
  var api_port, app_port, exitHandler, host, main;

  api_port = 8000;

  app_port = 9000;

  host = "localhost";

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

  main = function(_api_port, _app_port, _host) {
    var httpProxy;
    if (_api_port == null) {
      _api_port = 8000;
    }
    if (_app_port == null) {
      _app_port = 9000;
    }
    if (_host == null) {
      _host = "localhost";
    }
    httpProxy = require("http-proxy");
    httpProxy.createServer({
      target: {
        host: _host,
        port: _api_port,
        xfwd: true
      }
    }).listen(_app_port);
    console.log("The app begins to listen on port#" + _app_port + " and to forward any request to port#" + _api_port);
  };

  main(api_port, app_port, host);

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
