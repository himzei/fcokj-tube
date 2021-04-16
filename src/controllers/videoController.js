import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  res.render("home", { pageTitle: "홈", videos });
};

export const watch = async (req, res) => {
  const {
    params: { id },
  } = req;

  const video = await Video.findById({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const video = await Video.findById({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "video not found" });
  }
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description, hashtags },
  } = req;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "video not found" });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`)),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "upload video" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
  } = req;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const search = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => res.send("Delete Video");
