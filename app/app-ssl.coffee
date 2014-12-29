#so the program will not close instantly
api_port=8000
app_port=9000
host="localhost"
exitHandler = (options, err) ->
  console.log "\nclean"  if options.cleanup
  console.log "\n"+err.stack  if err
  if options.exit
    process.exit()
    #main api_port,app_port,host
  return

main = (_api_port=8000,_app_port=9000,_host="localhost") ->
  httpProxy = require("http-proxy")
  httpProxy.createServer(
    target:
      host: _host
      port: _api_port
      xfwd: true
    #ssl:
    #  key: fs.readFileSync("valid-ssl-key.pem", "utf8")
    #  cert: fs.readFileSync("valid-ssl-cert.pem", "utf8")
  ).listen _app_port
  console.log "The app begins to listen on port#"+_app_port+" and to forward any request to port#"+_api_port
  return

main api_port,app_port,host

process.stdin.resume()

#do something when app is closing
process.on "exit", exitHandler.bind(null,
  cleanup: true
)

#catches ctrl+c event
process.on "SIGINT", exitHandler.bind(null,
  exit: true
)

#catches uncaught exceptions
process.on "uncaughtException", exitHandler.bind(null,
  exit: true
)

