const PROTO_PATH = "./get_api.proto";

const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true
});

const TestService = grpc.loadPackageDefinition(packageDefinition).TestService;
const client = new TestService(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );
client.getAll({}, (error, test_data) => {
    // if (error) console.log(test_data)
      console.log(test_data);
  });
module.exports = client;