import Event from "../model/event-model";
import asyncHandler from "../utils/asyc-handler";

export const getCreateEvent = asyncHandler(async (req, res) => {
  return res.render("event-create", { error: null });
});

export const createEvent = asyncHandler(async (req, res, next) => {
  const { title, description, date, location, startTime, endTime } = req.body;

  if (!title || !date || !location || !startTime || !endTime) {
    return res.render("create-event", {
      error: "All fields are required",
    });
  }

  const event = await Event.create({
    title,
    description,
    date,
    location,
    startTime,
    endTime,
    hostId: req.userId,
  });
  event.link = `http://localhost:3000/event/${event.eventId}`;
  await event.save();

  if (!event) throw new Error("Event creation failed");

  return res
    .status(201)
    .render("event-created", { message: "Event created", event: event });
});

export const getEvent = asyncHandler(async (req, res, next) => {
  const { eventId } = req.params;

  const event = await Event.findOne({ eventId })
    .populate("host")
    .populate("attendees")
    .exec();

  if (!event) {
    return res.status(404).send("Event not found");
  }

  if (!event.isActive) {
    return res.status(410).send("Event is no longer active");
  }

  return res.status(200).render("event-get", { event });
});

export const getAllEvents = asyncHandler(async (req, res, next) => {
  const events = await Event.find({ isActive: true }).populate("host").exec();

  if (!events || events.length === 0) {
    return res.status(404).send("No active events found");
  }

  return res.status(200).render("events-list", { events });
});
