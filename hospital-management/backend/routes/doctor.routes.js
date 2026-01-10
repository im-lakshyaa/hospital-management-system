import express from "express";
import {
  createDoctor,
  getAllDoctors,
  getMyDoctorProfile
} from "../controllers/doctor.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();


router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createDoctor
);


router.get("/", authMiddleware, getAllDoctors);


router.get(
  "/me",
  authMiddleware,
  authorizeRoles("doctor"),
  getMyDoctorProfile
);

export default router;
