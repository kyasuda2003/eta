(function() {
  var apiProxy, app_port, exp, express, host, httpProxy, path, poe_port, proxicode_port, proxy;

  apiProxy = function(_poe_port, _proxicode_port, _host) {
    return function(req, res, next) {
      var _ref, _ref1;
      if ((req != null ? (_ref = req.host) != null ? _ref.match(new RegExp("^www.pacificoasis.com")) : void 0 : void 0) || req.host.match(new RegExp("^pacificoasis.com"))) {
        proxy.web(req, res, {
          target: {
            host: _host,
            port: _poe_port,
            xfwd: true
          }
        });
      } else if ((req != null ? (_ref1 = req.host) != null ? _ref1.match(new RegExp("^www.proxicode.cc")) : void 0 : void 0) || req.host.match(new RegExp("^proxicode.cc"))) {
        proxy.web(req, res, {
          target: {
            host: _host,
            port: _proxicode_port,
            xfwd: true
          }
        });
      } else {
        next();
      }
    };
  };

  /*
  webAccess = ->
    (req, res, next) ->
      p = undefined
      vpath = undefined
      if req.url.match(new RegExp("^/admin/"))
        p = currentAdminPath + req.path.substring(6)
        if path.existsSync(p)
          console.log "loading.. " + p
          res.sendfile p
        else
          res.send "Thank you for your inquiry."
      else
        vpath = ((if req.path is "/" then "/index.html" else path.resolve(req.path)))
        if path.existsSync(currentPath + vpath)
          console.log "loading.. " + vpath
          res.sendfile currentPath + vpath
        else
          res.send "Thanks for your inquery."
      return
  */


  host = "localhost";

  poe_port = 8000;

  proxicode_port = 8001;

  app_port = 9000;

  express = require("express");

  path = require("path");

  console.log("__dirname:" + __dirname);

  exp = express();

  httpProxy = require("http-proxy");

  proxy = httpProxy.createProxyServer({});

  exp.configure(function() {
    exp.use(apiProxy(poe_port, proxicode_port, host));
  });

  exp.listen(app_port);

  console.log("The application's listening on the port# " + app_port);

  process.on("uncaughtException", function(err) {
    console.log("Application exits. err: " + err);
  });

  process.on("SIGTERM", function(err) {
    console.log("Application killed successfully. err: " + err);
  });

}).call(this);
