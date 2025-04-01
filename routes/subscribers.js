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
router.get("/:id", getSubscriber, (request, response) => {
  response.json(response.subscriber);
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
router.patch("/:id", getSubscriber, (request, response) => {});

//Deleting one
router.delete("/:id", getSubscriber, async (request, response) => {
  try {
    await response.subscriber.deleteOne();
    response.json({ message: "Deleted Subscriber" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

//middleware for getting a subscriber for further processing
async function getSubscriber(request, response, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(request.params.id);
    if (subscriber == null) {
      return response.status(404).json({ message: "cannot find subscriber" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }

  response.subscriber = subscriber;
  next();
}

module.exports = router;
