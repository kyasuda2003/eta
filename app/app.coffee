apiProxy = (_poe_port, _proxicode_port, _host) ->
  (req, res, next) ->
    if req.host.match(new RegExp("^www.pacificoasis.com")) or req.host.match(new RegExp("^pacificoasis.com"))
      proxy.web req, res,
        target:
          host: _host
          port: _poe_port
          xfwd: true

    else if req.host.match(new RegExp("^www.proxicode.cc")) or req.host.match(new RegExp("^proxicode.cc"))
      proxy.web req, res,
        target:
          host: _host
          port: _proxicode_port
          xfwd: true

    else
      next()
    return
###
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
###
host = "localhost"
poe_port = 8000
proxicode_port = 8001
app_port = 9000
express = require("express")
path = require("path")
console.log "__dirname:" + __dirname

#currentPath = path.resolve(__dirname, "..", "..", "./theta/trunk/app")
#currentAdminPath = path.resolve(__dirname, "..", "..", "./xi/trunk/app")
#console.log "currentPath:" + currentPath

exp = express()
httpProxy = require("http-proxy")
proxy = httpProxy.createProxyServer({})

exp.configure ->
  exp.use apiProxy(poe_port, proxicode_port, host)
  return

exp.listen app_port
console.log "The application's listening on the port# " + app_port
process.on "uncaughtException", (err) ->
  console.log "Application exits. err: " + err
  return

process.on "SIGTERM", (err) ->
  console.log "Application killed successfully. err: " + err
  return
