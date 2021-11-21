const fs = require("fs");

/**
 * Appends File with Logs
 * @param {String} data > JSON string
 * @returns --
 */
exports.appendLogsFile = (data) => {
  if (!fs.existsSync("./logs/logs.log")) {
    fs.mkdirSync("./logs", { recursive: true });
    fs.writeFileSync("./logs/logs.log", data);
    return;
  }

  if (fs.existsSync("./logs/logs.log"))
    fs.appendFileSync("./logs/logs.log", "\r" + data);
};

/**
 * Formats Response Headers
 * @param {Object} headers
 * @returns
 */
exports.responseHeaders = (headers) => {
  const { statusCode, statusMessage, aborted, complete } = headers;

  return { statusCode, statusMessage, aborted, complete };
};

/**
 * Formats logs
 * @param {Object} req
 * @param {Object} res
 * @param {Object} headers
 * @returns
 */
exports.logFormatter = (req, res, headers) => {
  const head = this.responseHeaders(headers);
  return {
    request: req,
    response: res,
    headers: head,
  };
};

/**
 * Formats and process for log file appending
 * @param {Object} request
 * @param {Object} data
 * @param {Object} response
 * @returns
 */
exports.writeLogger = (request, data, response) => {
  const log = this.logFormatter(request, data, response);

  this.appendLogsFile(JSON.stringify(log));
  return;
};

/**
 * Middleware function to process log process
 * @param {Object} req
 * @param {Object} response
 * @param {Function} next
 */
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

/**
 * Read logs
 * @returns {Object} Logs
 */
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

/**
 * Function to Clear Logs
 *
 * @returns {String}
 */
exports.clearLogs = () => {
  try {
    fs.unlinkSync("logs/logs.log");
    console.log("Logs Cleared Successfully");
  } catch (e) {
    console.error(e);
  }
};
