const { Router } = require("express");
const router = Router();
const {
  saveCountriesData,
  getCountriesFromDb,
  getCountryById,
  getCountryByName,
} = require("../../src/helpers/countriesData.js");

router.get("", async (req, res) => {
  try {
    let { name } = req.query;
    await saveCountriesData();
    let countriesDb = await getCountriesFromDb();
    if (!countriesDb.length) {
      return res.status(503).send("No countries found");
    }

    countriesDb = countriesDb.map(
      ({
        id,
        name,
        flag,
        continent,
        capital,
        area,
        subregion,
        population,
        touristActivities,
      }) => {
        return {
          flag,
          id,
          name,
          continent,
          capital,
          area,
          subregion,
          population,
          touristActivities,
        };
      }
    );
    if (name) {
      let countryByName = await getCountryByName(name);

      if (!countryByName.length) {
        return res.status(404).send("No country found");
      } else {
        countryByName = countryByName.map((el) => {
          return {
            id: el.dataValues.id,
            name: el.dataValues.name,
            flag: el.dataValues.flag,
            continent: el.dataValues.continent,
            capital: el.dataValues.capital,
            area: el.dataValues.area,
            subregion: el.dataValues.subregion,
            population: el.dataValues.population,
            touristActivities: el.dataValues.touristActivities,
          };
        });

        return res.status(200).send(countryByName);
      }
    }

    res.status(200).send(countriesDb);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:idPais", async (req, res) => {
  try {
    let { idPais } = req.params;
    let countryById = await getCountryById(idPais);
    if (!countryById) {
      return res.status(404).send(`The ID doesn't exist`);
    }
    res.status(200).send(countryById);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
