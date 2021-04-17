import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Create Account" });
};
export const postJoin = async (req, res) => {
  const {
    body: { name, username, email, password, location },
  } = req;
  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  res.redirect("/login");
};
export const getLogin = (req, res) => res.send("Login");
export const postLogin = (req, res) => {};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("See");
