module.exports = app => {
    const animal_locations = require("../controllers/animal_locations.controller.js");
  
    var router = require("express").Router();
  
    // Create a new AnimalLocation
    router.post("/", animal_locations.create);
  
    // Retrieve all AnimalLocations
    router.get("/", animal_locations.findAll);
  
    // Retrieve a single AnimalLocation with id
    router.get("/:id", animal_locations.findOne);
  
    // Update a AnimalLocation with id
    router.put("/:id", animal_locations.update);
  
    // Delete a AnimalLocation with id
    router.delete("/:id", animal_locations.delete);
  
    // Delete all AnimalLocations
    router.delete("/", animal_locations.deleteAll);
  
    app.use('/api/animal_locations', router);
  };
  