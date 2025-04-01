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
router.patch("/:id", getSubscriber, async (request, response) => {
  if (request.body.name != null) {
    response.subscriber.name = request.body.name;
  }
  if (request.body.subscribedToChannel != null) {
    response.subscriber.subscribedToChannel = request.body.subscribedToChannel;
  }
  console.log(response.subscriber);
  try {
    const updatedSubscriber = await response.subscriber.save();
    response.status(202).json(updatedSubscriber);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

//Deleting one
router.delete("/:id", getSubscriber, async (request, response) => {
  try {
    await response.subscriber.deleteOne();
    response.status(203).json({ message: "Deleted Subscriber" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

//middleware for getting a subscriber for further processing
async function getSubscriber(request, response, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(request.params.id);
    console.log(subscriber);
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
