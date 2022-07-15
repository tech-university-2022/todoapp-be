module.exports = (res, data, message = 'OK') =>
  res.send({
    message,
    ...data,
  });
