import express from "express";
import {
  bookAppointment,
  getMyAppointments,
  cancelAppointment
} from "../controllers/appointment.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();


router.post(
  "/",
  authMiddleware,
  authorizeRoles("patient"),
  bookAppointment
);


router.get(
  "/my",
  authMiddleware,
  authorizeRoles("patient", "doctor"),
  getMyAppointments
);

router.patch(
  "/:id/cancel",
  authMiddleware,
  authorizeRoles("patient", "admin"),
  cancelAppointment
);

export default router;
