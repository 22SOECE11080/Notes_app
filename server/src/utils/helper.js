/**
 * Create a standard API response
 * @param {Object} res - Express response object
 * @param {Boolean} success - Was the operation successful?
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Message to return
 * @param {Object} [data] - Any additional data
 */
const createResponse = (res, success, statusCode, message, data = {}) => {
    console.log(`🟢 createResponse => Success: ${success}, Status: ${statusCode}, Message: ${message}`);
    return res.status(statusCode).json({
        success,
        statusCode,
        message,
        payload: data,
    });
};

/**
 * Custom error handler middleware (used globally)
 * Must be registered with `app.use(customErrorHandler)`
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 */
const customErrorHandler = (err, req, res, next) => {
    console.error('🔴 Error:', err.message || err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
};

module.exports = {
    createResponse,
    customErrorHandler,
};
