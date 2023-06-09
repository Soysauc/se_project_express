const ERROR_CODES = {
  OK: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  ServerError: 500,
};

const handleError = (err, req, res) => {
  if (err.statusCode === 400 || err.name === 'ValidationError') {
    res
      .status(ERROR_CODES.BadRequest)
      .send({ message: `${ERROR_CODES.BadRequest} Invalid input` });
  } else if (
    err.statusCode === 401 ||
    err.message === 'Incorrect email or password' ||
    err.message === 'data and hash arguments required'
  ) {
    res.status(ERROR_CODES.Unauthorized).send({
      message: `${ERROR_CODES.Unauthorized} Unauthorized`,
    });
  } else if (err.statusCode === 403 || err.name === 'Forbidden') {
    res
      .status(ERROR_CODES.Forbidden)
      .send({ message: `${ERROR_CODES.Forbidden} Forbidden` });
  } else if (err.statusCode === 404 || err.name === 'DocumentNotFoundError') {
    res
      .status(ERROR_CODES.NotFound)
      .send({ message: `${ERROR_CODES.NotFound} Not found` });
  } else if (err.statusCode === 409) {
    res.status(ERROR_CODES.Conflict).send({
      message: `${ERROR_CODES.Conflict} That email address is already associated with an account`,
    });
  } else if (err.name === 'CastError') {
    res.status(400).send({ message: 'Invalid ID' });
  } else {
    res.status(ERROR_CODES.ServerError).send({
      message: `${ERROR_CODES.ServerError} Something went wrong`,
    });
  }
};

const handleAuthError = (res) => {
  res.status(ERROR_CODES.Unauthorized).send({ message: 'Authorization Error' });
};

module.exports = {
  ERROR_CODES,
  handleError,
  handleAuthError,
};
