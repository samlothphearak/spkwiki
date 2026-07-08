const Article = require("../models/Article");

exports.createArticle = async (req, res) => {
  try {
    const { title, content, description, tags, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required." });
    }

    const slug = title
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    const existingArticle = await Article.findOne({ slug });
    if (existingArticle) {
      return res.status(409).json({ success: false, message: "An article with this title already exists." });
    }

    const article = await Article.create({
      title,
      slug,
      description: description || "",
      content,
      author: req.user._id,
      category: category || null,
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
    });

    res.status(201).json({
      success: true,
      article,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Unable to create article.", error: error.message });
  }
};
