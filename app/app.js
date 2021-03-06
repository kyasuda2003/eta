(function() {
  var apiProxy, app_port, exp, express, host, httpProxy, openfire_admin_port, openfire_client_port, path, poe_port, proxicode_port, proxy;

  apiProxy = function(_poe_port, _proxicode_port, _openfire_client_port, _host) {
    return function(req, res, next) {
      var _ref, _ref1, _ref2, _ref3;
      if ((req != null ? (_ref = req.host) != null ? _ref.match(new RegExp("^www.pacificoasis.com")) : void 0 : void 0) || (req != null ? (_ref1 = req.host) != null ? _ref1.match(new RegExp("^pacificoasis.com")) : void 0 : void 0)) {
        proxy.web(req, res, {
          target: {
            host: _host,
            port: _poe_port,
            xfwd: true
          }
        });
      } else if ((req != null ? (_ref2 = req.host) != null ? _ref2.match(new RegExp("^www.proxicode.cc")) : void 0 : void 0) || (req != null ? (_ref3 = req.host) != null ? _ref3.match(new RegExp("^proxicode.cc")) : void 0 : void 0)) {
        console.log("req.url: " + req.url);
        proxy.web(req, res, {
          target: {
            host: _host,
            port: req.url.match(new RegExp("\/http-bind\/$")) ? _openfire_client_port : _proxicode_port,
            xfwd: true
          }
        });
      } else {
        console.log("req.host: " + req.host);
        console.log("req.url: " + req.url);
        console.log("req.query: " + req.query.toString());
        console.log("timestamps: " + new Date().toString());
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

  openfire_admin_port = 8002;

  openfire_client_port = 8004;

  app_port = 9000;

  express = require("express");

  path = require("path");

  console.log("__dirname:" + __dirname);

  exp = express();

  httpProxy = require("http-proxy");

  proxy = httpProxy.createProxyServer({});

  exp.disable('x-powered-by');

  exp.configure(function() {
    exp.use(apiProxy(poe_port, proxicode_port, openfire_client_port, host));
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
