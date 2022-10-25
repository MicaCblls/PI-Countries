const { Router } = require("express");
const createActivity = require("../helpers/touristActivitiesData");
const router = Router();

router.post("", async (req, res) => {
  try {
    let { name, difficulty, duration, season, countries } = req.body;
    if (!name || !difficulty || !duration || !season || !countries) {
      return res.status(400).send("Please enter all the data");
    }

    let newActivity = await createActivity(
      name,
      difficulty,
      duration,
      season,
      countries
    );

    res.status(201).send(newActivity.dataValues);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
