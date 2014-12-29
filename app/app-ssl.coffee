#so the program will not close instantly
_api_port=8000
_app_port=9000

exitHandler = (options, err) ->
  console.log "\nclean"  if options.cleanup
  console.log "\n"+err.stack  if err
  process.exit()  if options.exit
  return
  
httpProxy = require("http-proxy")
httpProxy.createServer(
  target:
    host: "localhost"
    port: _api_port
  #ssl:
  #  key: fs.readFileSync("valid-ssl-key.pem", "utf8")
  #  cert: fs.readFileSync("valid-ssl-cert.pem", "utf8")
).listen _app_port

console.log "The app begins to listen on port#"+_app_port+" and to forward any request to port#"+_api_port


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

