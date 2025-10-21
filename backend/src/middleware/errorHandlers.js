export function notFoundHandler(req, res, next) {
  res.status(404).json({ message: `Endpoint ${req.originalUrl} tidak ditemukan.` });
  next();
}

export function errorHandler(err, _req, res, _next) {
  const status = err.status || err.statusCode || 500;
  const response = {
    message: err.message || 'Terjadi kesalahan pada server.',
  };
  if (process.env.NODE_ENV !== 'production') {
    response.detail = err.stack;
  }
  res.status(status).json(response);
}
