const express = require("express");
const Subscriber = require("../models/subscribers");
const router = express.Router();
//Following routes re needed:
//Getting all
router.get("/", async (request, response) => {
  try {
    const subscribers = await Subscriber.find();
    response.json(subscribers);
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
});

//Getting one
router.get("/:id", (request, response) => {
  response.send(`Get one sub for: ${request.params.id}`);
});

//Creating one
router.post("", async (request, response) => {
  const subscriber = new Subscriber({
    name: request.body.name,
    subscribedToChannel: request.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    response.status(201).json(newSubscriber);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

//Update one
router.patch("/:id", (request, response) => {});

//Deleting one
router.delete("/:id", (request, response) => {});

module.exports = router;
