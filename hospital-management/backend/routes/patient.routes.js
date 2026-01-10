import express from "express";
import {
  createPatient,
  getAllPatients,
  getMyPatientProfile
} from "../controllers/patient.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();


router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createPatient
);


router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "doctor"),
  getAllPatients
);


router.get(
  "/me",
  authMiddleware,
  authorizeRoles("patient"),
  getMyPatientProfile
);

export default router;
