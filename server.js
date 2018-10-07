const http=require("http");

let config=require("./config/config")
const app=require("./app");
const debug=require("debug")("node-angular");
const socketIO=require("socket.io");

let socketInstance;

// let server=http.createServer((req,resp)=>{
//     resp.end("This is ITTT")
// })

const normalizePort = val => {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  };
  
  const onError = error => {
    if (error.syscall !== "listen") {
      throw error;
    }
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
  const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
   console.log("Listening on " + bind);
    
  };
  
  const port = normalizePort(process.env.PORT || "3002");
  app.set("port", port);

let server=http.createServer(app)

// let io= socketIO(server);

// io.on("connection",(socket)=>{

//   console.log("In");
//   socketInstance=socket;

//   socket.on('createTrade', () =>{
                
//     console.log("event occured");

//     //console.log(data);

//     io.emit("newTrade")
    

// })
// })



server.on("error", onError);
server.on("listening", onListening);


server.listen(port);

module.exports={app}

