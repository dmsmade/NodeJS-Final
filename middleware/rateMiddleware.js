const middleware = {};

middleware.checkId = (req, res, next) => {
  if (req.body._id === undefined) res.send('Id error');
  else next();
};

middleware.checkWeight = (req, res, next) => {
  if (req.body.weight === undefined) res.send('weight error');
  else next();
};

middleware.checkPrice = (req, res, next) => {
  if (req.body.price === undefined) res.send('price error');
  else next();
};

middleware.checkFromCountry = (req, res, next) => {
  if (req.body.fromcountry === undefined) res.send('from country error');
  else next();
};

middleware.checkToCountry = (req, res, next) => {
  if (req.body.tocountry === undefined) res.send('to country error');
  else next();
};

export default middleware;