const { Country, TouristActivity } = require("../db");

const createActivity = async (name, difficulty, duration, season, country) => {
  try {
    let newActivity = await TouristActivity.create({
      name,
      difficulty,
      duration,
      season,
    });
    let relatedCountries = await Country.findAll({ where: { id: country } });
    newActivity.addCountries(relatedCountries);
    return newActivity;
  } catch (error) {
    return error;
  }
};

const getTouristActivities = async () => {
  try {
    const activitiesFromDb = await TouristActivity.findAll({
      include: { model: Country },
    });

    return activitiesFromDb;
  } catch (error) {
    return error;
  }
};

module.exports = { createActivity, getTouristActivities };
