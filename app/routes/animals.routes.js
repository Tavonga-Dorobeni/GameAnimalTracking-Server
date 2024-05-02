module.exports = app => {
    const animals = require("../controllers/animals.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Animal
    router.post("/", animals.create);
  
    // Retrieve all Animals
    router.get("/", animals.findAll);
  
    // Retrieve a single Animal with id
    router.get("/:id", animals.findOne);
  
    // Update a Animal with id
    router.put("/:id", animals.update);
  
    // Delete a Animal with id
    router.delete("/:id", animals.delete);
  
    // Delete all Animals
    router.delete("/", animals.deleteAll);
  
    app.use('/api/animals', router);
  };
  