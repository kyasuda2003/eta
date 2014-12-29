// Generated by CoffeeScript 1.8.0
(function() {
  var apiProxy, currentAdminPath, currentPath, exp, express, httpProxy, path, webAccess, _api_port, _app_port;

  apiProxy = function(url) {
    return function(req, res, next) {
      var proxy;
      if (req.url.match(new RegExp("^/api/"))) {
        proxy = httpProxy.createProxyServer({});
        proxy.web(req, res, {
          target: url
        });
      } else {
        next();
      }
    };
  };

  webAccess = function() {
    return function(req, res, next) {
      var p, vpath;
      if (req.url.match(new RegExp("^/admin/"))) {
        p = currentAdminPath + req.path.substring(6);
        if (path.existsSync(p)) {
          console.log("loading.. " + p);
          res.sendfile(p);
        } else {
          res.send("Thank you for your inquiry.");
        }
      } else {
        vpath = (req.path === "/" ? "/index.html" : path.resolve(req.path));
        if (path.existsSync(currentPath + vpath)) {
          console.log("loading.. " + vpath);
          res.sendfile(currentPath + vpath);
        } else {
          res.send("Thanks for your inquery.");
        }
      }
    };
  };

  _api_port = 8999;

  _app_port = 9000;

  express = require("express");

  path = require("path");

  console.log("__dirname:" + __dirname);

  currentPath = path.resolve(__dirname, "..", "..", "./theta/trunk/app");

  currentAdminPath = path.resolve(__dirname, "..", "..", "./xi/trunk/app");

  console.log("currentPath:" + currentPath);

  exp = express();

  httpProxy = require("http-proxy");

  exp.configure(function() {
    exp.use(apiProxy("http://localhost:" + _api_port));
    exp.use(webAccess());
  });

  exp.listen(_app_port);

  console.log("The application's listening on the port# " + _app_port);

  process.on("uncaughtException", function(err) {
    console.log("Application exits. err: " + err);
  });

  process.on("SIGTERM", function(err) {
    console.log("Application killed successfully. err: " + err);
  });

}).call(this);