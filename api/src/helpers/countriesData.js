const axios = require("axios");
const { Country, TouristActivity, Op } = require("../db");

const saveCountriesData = async () => {
  try {
    let countries = await getCountriesFromDb();
    if (countries.length < 200) {
      const response = await axios.get("https://restcountries.com/v3/all");

      let organizedData = response.data.map((country) => {
        return {
          id: country.cca3,
          name: country.name.official,
          flag: country.flags[1],
          continent: country.continents.toString(),
          capital: country.capital ? country.capital.toString() : "---",
          subregion: country.subregion ? country.subregion : "---",
          area: country.area.toString(),
          population: country.population,
        };
      });

      await Country.bulkCreate(organizedData, { validate: true });
    }
  } catch (error) {
    return error;
  }
};

const getCountriesFromDb = async () => {
  try {
    let countriesDb = await Country.findAll({
      include: { model: TouristActivity },
    });
    return countriesDb;
  } catch (error) {
    return error;
  }
};

const getCountryById = async (id) => {
  try {
    let country = await Country.findByPk(id, {
      include: { model: TouristActivity },
    });

    return country;
  } catch (error) {
    return error;
  }
};

const getCountryByName = async (name) => {
  try {
    let country = await Country.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });

    return country;
  } catch (error) {
    return error;
  }
};

module.exports = {
  saveCountriesData,
  getCountriesFromDb,
  getCountryById,
  getCountryByName,
};
