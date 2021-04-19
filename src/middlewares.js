export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "외국인과동행";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  console.log(res.locals);
  next();
};
