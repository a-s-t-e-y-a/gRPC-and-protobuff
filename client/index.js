const client = require("./client");
const express = require('express')
const app = express();

app.get("/", (req, res) => {
    console.log("SDfds")
	client.getAll(null, (err, data) => {
		if (!err) {
			res.status(200).json({
                new:array
            })
		}
        else{
            res.json({
                err:"ghfgh"
            })
        }
	});
});

app.listen(8000, () => {
	console.log("Server running at port %d", 8000);
});