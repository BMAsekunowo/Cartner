const errorHandler = (err, req, res, next) => {
  console.error(`  Error: ${err.name} - ${err.message}`);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
