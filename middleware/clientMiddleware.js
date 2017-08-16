const middleware = {};

middleware.checkWeight = (req, res, next) => {
  if (req.body.package.gross_weight.amount === undefined) res.send('weight error');
  else next();
};

middleware.checkFromCountry = (req, res, next) => {
  if (req.body.origin.address.country_code === undefined) res.send('from country error');
  else next();
};

middleware.checkToCountry = (req, res, next) => {
  if (req.body.destination.address.country_code === undefined) res.send('to country error');
  else next();
};

middleware.checkRef = (req, res, next) => {
  if (req.body.ref === undefined) res.send('ref error');
  else next();
};

export default middleware;