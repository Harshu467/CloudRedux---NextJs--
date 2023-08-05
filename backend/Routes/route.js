const {register,login} = require("../Controller/AuthController");
const {createEvent,getAllVirtualEvents,getVirtualEventDetails,eventsUpdate} = require("../Controller/EventController");
const router = require("express").Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/createEvent/:userId").post(createEvent);
router.route("/getAllEvents").get(getAllVirtualEvents);
router.route("/eventsUpdate/:userId/:eventId").put(eventsUpdate);
module.exports = router;