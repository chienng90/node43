import { response } from "express";

class ResponseHelper {
  static sendResponse(status, message, data, response) {
    response.status(status).json({
      statusCode: status,
      message,
      content: data,
      timestamp: new Date().toUTCString(),
    });
  }
}

export default ResponseHelper;
