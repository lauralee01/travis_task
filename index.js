var http = require("http");

let app = http.createServer(function(res, req) {

	res.send("Server started");
})

app.listen(3000, function() {

	console.log("Server started");
})