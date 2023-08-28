const unknownEndPoint = (req, res) => {
  res.status(400).end();
};

const errorHandler = (error, request, response, next) => {
  {
    console.error(error.message);
    if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    } else if (error.name === "JsonWebTokenError") {
      return response.status(401).json({ error: "Unauthorized Access!" });
    } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'
      })
    }
  
    next(error);
  }
};

module.exports = { unknownEndPoint, errorHandler };
