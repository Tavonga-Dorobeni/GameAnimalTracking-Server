const db = require("../models");
const Animal = db.animals;
const Op = db.Sequelize.Op;

// Create and Save a new Animal
exports.create = (req, res) => {
  // Create a Animal
  Animal.create(req.body)
    .then((data) => {
      res.send({
        animal: data,
        message: "Animal posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Animal.",
      });
      console.log(err)
    });
};

// Retrieve all Animals from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Animal.findAll({
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

// Find a single Animal with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Animal.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Animal with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Animal",
      });
      console.log(">> Error while retrieving Animal: ", err);
    });
};

// Update a Animal by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Animal.update(req.body, {
    where: { AnimalID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Animal was updated successfully.",
        });
      } else {
        res.send({
          message: `Animal was not found!`,
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
        message: "Error while updating Animal",
      });
      console.log(">> Error while updating Animal: ", err);
    });
};

// Delete a Animal with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Animal.destroy({
    where: { AnimalID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Animal was deleted successfully!",
        });
      } else {
        res.send({
          message: `Animal was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Animal",
      });
      console.log(">> Error while deleting Animal: ", err);
    });
};

// Delete all Animals from the database.
exports.deleteAll = (req, res) => {
  Animal.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Animals were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all Animals: ", err);
    });
};
