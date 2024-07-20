import { response } from "express";

export const resp = (data, message, status, response) => {
    response.status(status).json({
        statusCode: status, 
        message, 
        content: data,
        timesstamp: new Date()
    })
}