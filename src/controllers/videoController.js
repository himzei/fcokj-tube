import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  res.render("home", { pageTitle: "홈", videos });
};

export const watch = (req, res) => {
  const {
    params: { id },
  } = req;

  return res.render("watch", { pageTitle: `Watching ${video.title}` });
};

export const getEdit = (req, res) => {
  const {
    params: { id },
  } = req;

  return res.render("edit", { pageTitle: `Editing: ${video.title}` });
};

export const postEdit = (req, res) => {
  const {
    params: { id },
  } = req;

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "upload video" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
  } = req;

  await Video.create({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags
      .split(",")
      .strip(" ")
      .map((word) => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });

  return res.redirect("/");
};

export const search = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => res.send("Delete Video");
