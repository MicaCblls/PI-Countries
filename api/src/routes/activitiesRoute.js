const { Router } = require("express");
const { getTouristActivities } = require("../helpers/touristActivitiesData");
const router = Router();

router.get("", async (req, res) => {
  try {
    const activitiesFromDb = await getTouristActivities();
    if (!activitiesFromDb) {
      return res.status(204).send("No activities created");
    }
    res.status(200).send(activitiesFromDb);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
