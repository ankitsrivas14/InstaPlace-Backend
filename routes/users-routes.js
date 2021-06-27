const express = require("express");

const router = express.Router();

router.get("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  res.json({ userId });
});

module.exports = router;
