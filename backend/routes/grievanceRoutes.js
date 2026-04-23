const router = require("express").Router();
const Grievance = require("../models/Grievance");
const auth = require("../middleware/authMiddleware");

// CREATE
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const grievance = new Grievance({
      userId: req.user.id,
      title,
      description,
      category
    });

    await grievance.save();
    res.json({ msg: "Grievance submitted" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// GET MY
router.get("/my", auth, async (req, res) => {
  try {
    const data = await Grievance.find({ userId: req.user.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;