const shortid = require("shortid");
const URL = require("../models/URL.models.js");
const userModel = require("../models/user.model.js");

// exports.getUrl = async (req, res) => {
//   const {email} = req.user;
//   if(!email) return req.redirect("/user/login");
//   try {
//     const user = await userModel.findOne({email:email});
//     if(!user){
//       throw new Error("User not found ! ");
//     }
//     const shortedUrls = await URL.find({_id:user._id});
//     if (shortedUrls.length === 0) {
//       throw new Error("No short URLs are there :<");
//     }
//     res.json(shortedUrls);
//   } catch (err) {
//     res.status(404).json({
//       // correct syntax
//       msg: err.message,
//     });
//   }
// };

exports.getUrl = async (req, res) => {
  const { email } = req.user;
  if (!email) return res.redirect("/user/login");

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw new Error("User not found!");
    }

    const Urls = await URL.find({ author: user._id });
    if (Urls.length === 0) {
      throw new Error("Nothing to show :(");
    }

    res.render("index", { shortedId: null, Urls: Urls });
  } catch (err) {
    console.error(err);
    res.render("index", { shortedId: null, Urls: null });
  }
};


exports.moveToOgUrl = async (req, res) => {
  const shortId = req.params.shortId; // or req.body.shortId depending on how you send it

  if (!shortId) {
    return res.status(400).json({
      msg: "Short URL is not provided",
    });
  }

  try {
    // Find the original URL
    const OgUrlObject = await URL.findOne({ ShortUrl: shortId });

    if (!OgUrlObject) {
      throw new Error("URL not found :(");
    }
    await URL.updateOne(
      { ShortUrl: OgUrlObject.ShortUrl }, // filter
      { $push: { vistingHistory: { timestamp: new Date() } } } // update
    );
    // Redirect to the original URL
    return res.redirect(OgUrlObject.URL);
  } catch (err) {
    return res.status(404).json({
      msg: err.message,
    });
  }
};

exports.postUrl = async (req, res) => {
  const { mainUrl } = req.body;
  const { email } = req.user;
  // Check if URL is provided
  if (!mainUrl) {
    return res.status(400).json({
      msg: "Your URL is missing :<",
    });
  }

  // Generate short ID
  const shortIdG = shortid.generate();

  try {
    // Create and save new short URL entry
    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw new Error("user found ! ");
    }
    await URL.create({
      URL: mainUrl,
      ShortUrl: shortIdG,
      author: user._id,
    });
    const Urls = await URL.find({author:user._id
    });
    // return res.status(201).json({
    //   msg: "Your ShortUrl is created!",
    //   shortUrl: shortIdG,
    // });
    const shortedId = shortIdG;
    return res.render("index", { shortedId: shortIdG, Urls: Urls });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Failed to create ShortUrl :(",
    });
  }
};


exports.postDeleteUrl = async (req,res)=>{
  const {urlId} = req.body;
  if(!urlId) return res.redirect('/url');
  const user_id = req.user._id;
  if(!user_id) return res.redirect("/user/login");
  
}