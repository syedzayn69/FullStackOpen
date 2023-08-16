const unknownEndPoint = (req, res) => {
  res.status(400).end();
};

const errorHandler = (error, request, response, next) => {
  {
    console.error(error.message);
    if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    }
    next(error);
  }
};

module.exports = { unknownEndPoint, errorHandler };
