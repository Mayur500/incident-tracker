const express = require("express");
const router = express.Router();

const controller = require("../controllers/incidents.controller");
const {
  createIncidentSchema,
  updateIncidentSchema,
} = require("../validators/incident.validator");

function validate(schema) {
  return function (req, res, next) {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    next();
  };
}

router.post("/", validate(createIncidentSchema), controller.createIncident);
router.get("/", controller.getIncidents);
router.get("/:id", controller.getIncidentById);
router.patch("/:id", validate(updateIncidentSchema), controller.updateIncident);

module.exports = router;
