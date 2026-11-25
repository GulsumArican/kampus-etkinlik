import { Router } from "express";
import { getEvents, getEventById, createEvent,
  getUpcomingEvents, updateEvent, deleteEvent } from "../controllers/event-controller.js";

const router = Router();
router.get("/", getEvents);
router.get("/upcoming", getUpcomingEvents); // /:id'den önce
router.get("/:id", getEventById);
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);
export default router;