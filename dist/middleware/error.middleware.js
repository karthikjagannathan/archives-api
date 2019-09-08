"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fofHandler = (_request, response) => {
    const status = 404;
    const message = 'Requested resource could not be found';
    response.status(status).send({
        status,
        message,
    });
};
exports.fofHandler = fofHandler;
const errorHandler = (error, _request, response) => {
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    response.status(status).send({
        status,
        message,
    });
};
exports.errorHandler = errorHandler;
