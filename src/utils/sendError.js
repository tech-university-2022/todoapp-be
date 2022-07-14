module.exports = (res, status, message) => res.status(status).send({ status, message });
