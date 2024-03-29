const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesRoute = require("./countriesRoute");
const activitiesRoute = require("./activitiesRoute");
const createActivity = require("./createActivities");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countriesRoute);
router.use("/activities", activitiesRoute);
router.use("/create", createActivity);

module.exports = router;
