## Installation

Compatible with Any Node JS 

Required Node fs library for file operations.

```sh
npm i rest-api-logger
```


# Rest API Logger (Express JS)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/bhavneeshgoyal99/Rest-API-Logger-Express-JS-)

This package helps you to record logs of APIs as a middleware.

- Secure
- Easy to use
- Regular Updates
- Neat and clean code
- Commented functions
- Optimized Code

## Features

- Records every API log
- Predefined Logging function
- Predefined function to Get Logs

## Upcoming
- Pagination for Logs
- Logs predefined APIs

## Github Repo
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/bhavneeshgoyal99/Rest-API-Logger-Express-JS-)
https://github.com/bhavneeshgoyal99/Rest-API-Logger-Express-JS-

## Sample Code
```sh
const http = require("http");
var express = require("express");
var app = express();
const fs = require("fs");

/* Importing Package */
const logger = require("loggers");

/* Adding Middleware */
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
```