const ERROR_CODES = {
  OK: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  ServerError: 500,
};

const handleError = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res
      .status(ERROR_CODES.BadRequest)
      .send({ message: `${ERROR_CODES.BadRequest} Invalid input` });
  } else if (err.statusCode === 401) {
    res
      .status(ERROR_CODES.Unauthorized)
      .send({ message: `${ERROR_CODES.Unauthorized} Unauthorized` });
  } else if (err.statusCode === 403) {
    res
      .status(ERROR_CODES.Forbidden)
      .send({ message: `${ERROR_CODES.Forbidden} Forbidden` });
  } else if (err.name === 'DocumentNotFoundError') {
    res
      .status(ERROR_CODES.NotFound)
      .send({ message: `${ERROR_CODES.NotFound} Not found` });
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
