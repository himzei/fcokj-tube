export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Create Account" });
};
export const postJoin = (req, res) => {
  console.log(req.body);
  res.end();
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("See");
