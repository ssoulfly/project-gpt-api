module.exports = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch((err) => {
      console.error(err);
      if (next) return res.send({
        error: true,
        message: err.message
      });
    });
  };
};
