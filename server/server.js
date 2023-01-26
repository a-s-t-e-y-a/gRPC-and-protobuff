const fetch = require("cross-fetch")
const PROTO_PATH = './get_api.proto'

var grpc = require('@grpc/grpc-js')
var protoLoader  = require("@grpc/proto-loader");


var packageDefination = protoLoader.loadSync(PROTO_PATH,{
  keepCase :true,
  longs:String,
  enumns : String,
  arrays : true
});

var testsProto = grpc.loadPackageDefinition(packageDefination);

const server = new grpc.Server();
 let tests;
  fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => tests=json)
      
// const tests = [
//   {
//     id :"id 1",
//     name:"krishna",
//     dob:"23.324.234",
//     data:"122423"
//   }
//   ,
//   {
//     id :"id 2",
//     name :"new name i dont know",
//     dob :"234243",
//     data:"dfskghdskf"
//   }
// ]

server.addService(testsProto.TestService.service,{
  GetAll: (_, callback) => {
    callback(null, { tests });
  }
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);
