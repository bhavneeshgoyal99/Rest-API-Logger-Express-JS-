const fs = require("fs");

exports.appendLogsFile = (data) => {
  if (!fs.existsSync("./logs/logs.log")) {
    fs.mkdirSync("./logs", { recursive: true });
    fs.writeFileSync("./logs/logs.log", data);
    return;
  }

  if (fs.existsSync("./logs/logs.log"))
    fs.appendFileSync("./logs/logs.log", "\r" + data);
};

exports.responseHeaders = (headers) => {
  const { statusCode, statusMessage, aborted, complete } = headers;

  return { statusCode, statusMessage, aborted, complete };
};

exports.logFormatter = (req, res, headers) => {
  const head = this.responseHeaders(headers);
  return {
    request: req,
    response: res,
    headers: head,
  };
};

exports.writeLogger = (request, data, response) => {
  const log = this.logFormatter(request, data, response);

  this.appendLogsFile(JSON.stringify(log));
  return;
};

exports.logger = (req, response, next) => {
  const { url, headers, params, query, method } = req;

  let apiRequest = {
    method,
    url,
    headers,
    params,
    query,
  };

  const oldJson = response.json;

  response.json = (data) => {
    console.log(data);
    this.writeLogger(apiRequest, data, response);

    return oldJson.call(response, data);
  };
  next();
};

exports.readLogs = () => {
  try {
    const logs = fs.readFileSync("logs/logs.log", {
      encoding: "utf-8",
      flag: "r",
    });

    const logsArray = logs.split("\r");

    return logsArray.map((log) => JSON.parse(log));
  } catch (e) {
    return {
      status: 0,
      message: "No Logs Exists",
    };
  }
};
