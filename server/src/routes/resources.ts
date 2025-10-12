import { Router } from "express";
import Resource from "../models/Resource";
import { categorizeResource } from "../utils/categorize";
// import auth middleware from BetterAuth integration
import { ensureAuth } from "../middleware/auth"; // placeholder

const router = Router();

router.post("/", ensureAuth, async (req, res) => {
  try {
    const { title, description, link, type } = req.body;
    if (!title || !link) return res.status(400).json({ message: "Title & link required" });

    // Ask AI for category & tags
    const ai = await categorizeResource(title, description);

    const resource = new Resource({
      title,
      description,
      link,
      type: type || "other",
      category: ai.category,
      tags: ai.tags,
      uploadedBy: req.user.id
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
