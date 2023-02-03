const { Router } = require("express");
const {
  createActivity,
  getTouristActivities,
} = require("../helpers/touristActivitiesData");
const router = Router();

router.post("", async (req, res) => {
  try {
    let { name, difficulty, duration, season, countries } = req.body;
    if (!name || !difficulty || !duration || !season || !countries) {
      return res.status(400).send("Please enter all the data");
    }
    let activities = await getTouristActivities();
    if (
      activities.length &&
      activities.some((e) => e.dataValues.name === name)
    ) {
      return res
        .status(400)
        .send("The activity was already created, try with a new one");
    }

    let newActivity = await createActivity(
      name,
      difficulty,
      duration,
      season,
      countries
    );

    res.status(201).send(newActivity && "Activity created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
