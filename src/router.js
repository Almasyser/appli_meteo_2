const express = require("express");

const router = express.Router();
/* ---- CITIES ROUTES ---- */
const citiesControllers = require("./controllers/cityControllers");
// afficher 
router.get("/cities", citiesControllers.getCities);
// afficher un 
router.get("/cities/:city_id", citiesControllers.getCityById);
// créer
router.post("/addcities", citiesControllers.addCity);
// modifier
router.put("/updatecities/:city_id", citiesControllers.updateCity);
// supprimer
router.delete("/deletecities/:city_id", citiesControllers.deleteCity);

module.exports = router;
