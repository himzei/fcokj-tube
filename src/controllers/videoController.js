export const trending = (req, res) => res.render("home", { pageTitle: "홈" });
export const see = (req, res) => {
  return res.render("watch");
};
export const edit = (req, res) => res.send("Edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("upload");
export const deleteVideo = (req, res) => res.send("Delete Video");
