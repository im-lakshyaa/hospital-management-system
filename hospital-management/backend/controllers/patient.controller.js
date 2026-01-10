import Patient from "../models/Patient.js";
import User from "../models/User.js";


export const createPatient = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      age,
      gender,
      phone,
      address,
      bloodGroup
    } = req.body;

    
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "patient"
    });

    
    const patient = await Patient.create({
      user: user._id,
      patientId: `PAT-${Date.now()}`,
      name,
      age,
      gender,
      phone,
      address,
      bloodGroup
    });

    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
};


export const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find()
      .populate("user", "email role")
      .sort({ createdAt: -1 });

    res.json(patients);
  } catch (error) {
    next(error);
  }
};

export const getMyPatientProfile = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user._id })
      .populate("user", "name email");

    if (!patient) {
      res.status(404);
      throw new Error("Patient profile not found");
    }

    res.json(patient);
  } catch (error) {
    next(error);
  }
};
