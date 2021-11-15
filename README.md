# logger

npm i rest-api-logger

# Sample Code

`
const http = require("http");
var express = require("express");
var app = express();
const fs = require("fs");
const logger = require("loggers");

app.use(logger.logger);

app.get("/", function (req, res) {
res.json({ test: "test" });
res.end();
});

app.get("/logs", function (req, res) {
const logs = logger.readLogs();

res.json(logs);
res.end();
});

const port = 4561;

app.listen(port, () => {
console.log("server started at " + port);
});

`
