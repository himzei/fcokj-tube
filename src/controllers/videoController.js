import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  res.render("home", { pageTitle: "홈", videos });
};

export const watch = async (req, res) => {
  const {
    params: { id },
  } = req;
  const video = await Video.findById(id).populate("owner");

  if (!video) {
    return res.render("404", { pageTitle: "video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;
  const video = await Video.findById({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "video not found" });
  }
  console.log(video.owner, _id);
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description, hashtags },
    session: {
      user: { _id },
    },
  } = req;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "upload video" });
};

export const postUpload = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    file: { path: fileUrl },
    body: { title, description, hashtags },
  } = req;

  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not Found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete({ _id: id });
  return res.redirect("/");
};

export const search = async (req, res) => {
  const {
    query: { keyword },
  } = req;
  let videos = [];

  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    });
  }

  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404);
  }
  video.modifiedPaths.views = video.modifiedPaths.views + 1;
  await video.save();
  return res.status(200);
};
