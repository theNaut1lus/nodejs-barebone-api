const express = require("express");
const router = express.Router();
//Following routes re needed:
//Getting all
router.get("/", (request, response) => {
  response.send("Get all subs");
});

//Getting one
router.get("/:id", (request, response) => {
  response.send(`Get one sub for: ${request.params.id}`);
});

//Creating one
router.post("/:id", (request, response) => {});

//Update one
router.patch("/:id", (request, response) => {});

//Deleting one
router.delete("/:id", (request, response) => {});

module.exports = router;
