module.exports = app => {
    const item = require("../controllers/item.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Item
    router.post("/addItem", item.addItem);
  
    // Retrieve all Items from lunch menu
    router.get("/lunchmenu", item.findAllItems);

    // Retrieve all Items from dinner menu
    router.get("/dinnermenu", item.findAllItems);    

    app.use('/api/item', router);
  };