const models = require("../models");
// récupérer l'ensemble des brands OK
const getCities = (req, res) => {
  models.cities
    .findAll()
    .then(([result]) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
    });
};
// récupérer un brand OK
const getCityById = (req, res) => {
  const cityId = req.params.city_id;
  if (!cityId) {
    return res.status(400).send("city_id is required");
  }
  console.log("######",cityId);
  models.cities
    .find(cityId)
    .then(([result]) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
    });
};
// ajouter un brand OK
const addCity = (req, res) => {
  const el = req.body;
  models.cities
    .add(el)
    .then(([rows]) => {
      if (rows.affectedRows) {
        res.status(201).send(rows);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err.code === "ER_DUP_ENTRY") {
        res.sendStatus(409);
      } else {
        console.error(err);
        res.sendStatus(500);
      }
    });
};
const updateCity = (req, res) => {
  const cityId = req.params.city_id;
  const el = req.body;
  models.cities
    .modify(cityId, el)
    .then(([rows]) => {
      if (rows) {
        res.status(200).send(el);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const deleteCity = (req, res) => {
  const cityId = req.params.city_id;
  
  models.cities
    .delete(cityId)
    .then(([rows]) => {
      if (rows) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  getCities,
  getCityById,
  addCity,
  updateCity,
  deleteCity
};
