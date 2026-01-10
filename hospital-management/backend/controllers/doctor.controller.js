import Doctor from "../models/Doctor.js";
import User from "../models/User.js";


export const createDoctor = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      qualification,
      experience,
      department,
      consultationFee,
      availability
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
      role: "doctor"
    });

   
    const doctor = await Doctor.create({
      user: user._id,
      doctorId: `DOC-${Date.now()}`,
      name,
      specialization,
      qualification,
      experience,
      department,
      consultationFee,
      availability
    });

    res.status(201).json(doctor);
  } catch (error) {
    next(error);
  }
};


export const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({ isActive: true })
      .populate("user", "email")
      .sort({ createdAt: -1 });

    res.json(doctors);
  } catch (error) {
    next(error);
  }
};


export const getMyDoctorProfile = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id })
      .populate("user", "name email");

    if (!doctor) {
      res.status(404);
      throw new Error("Doctor profile not found");
    }

    res.json(doctor);
  } catch (error) {
    next(error);
  }
};
