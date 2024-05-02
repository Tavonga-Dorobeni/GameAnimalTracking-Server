const db = require("../models");
const AnimalLocation = db.animal_locations;
const Op = db.Sequelize.Op;

// Create and Save a new AnimalLocation
exports.create = (req, res) => {
  // Create a AnimalLocation
  AnimalLocation.create(req.body)
    .then((data) => {
      res.send({
        animal_location: data,
        message: "AnimalLocation posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the AnimalLocation.",
      });
      console.log(err)
    });
};

// Retrieve all AnimalLocations from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  AnimalLocation.findAll({
  where: condition,
  include: [
    {
      all: true,
      nested: true
    }
  ],
  raw: false
})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving applications.",
      });
    });
};

// Find a single AnimalLocation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  AnimalLocation.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find AnimalLocation with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving AnimalLocation",
      });
      console.log(">> Error while retrieving AnimalLocation: ", err);
    });
};

// Update a AnimalLocation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  AnimalLocation.update(req.body, {
    where: { AnimalLocationID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "AnimalLocation was updated successfully.",
        });
      } else {
        res.send({
          message: `AnimalLocation was not found!`,
        });
      }
    })
    .catch(db.Sequelize.UniqueConstraintError, (err) => {
      res.status(500).send({
        message: `Duplication Error Occured. "${err.errors[0].value}" already exists!!`,
      });
      console.log(">> Duplication Error occured: ", err);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while updating AnimalLocation",
      });
      console.log(">> Error while updating AnimalLocation: ", err);
    });
};

// Delete a AnimalLocation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  AnimalLocation.destroy({
    where: { AnimalLocationID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "AnimalLocation was deleted successfully!",
        });
      } else {
        res.send({
          message: `AnimalLocation was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete AnimalLocation",
      });
      console.log(">> Error while deleting AnimalLocation: ", err);
    });
};

// Delete all AnimalLocations from the database.
exports.deleteAll = (req, res) => {
  AnimalLocation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} AnimalLocations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all AnimalLocations: ", err);
    });
};
