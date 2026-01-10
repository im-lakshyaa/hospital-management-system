import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";


export const bookAppointment = async (req, res, next) => {
  try {
    const { doctorId, appointmentDate, timeSlot, reason } = req.body;

   
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient) {
      res.status(404);
      throw new Error("Patient profile not found");
    }

    
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      res.status(404);
      throw new Error("Doctor not found");
    }

   
    const appointment = await Appointment.create({
      patient: patient._id,
      doctor: doctor._id,
      appointmentDate,
      timeSlot,
      reason,
      createdBy: req.user._id
    });

    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

export const getMyAppointments = async (req, res, next) => {
  try {
    let appointments;

    if (req.user.role === "patient") {
      const patient = await Patient.findOne({ user: req.user._id });

      appointments = await Appointment.find({ patient: patient._id })
        .populate("doctor", "name specialization")
        .sort({ appointmentDate: 1 });
    }

    if (req.user.role === "doctor") {
      const doctor = await Doctor.findOne({ user: req.user._id });

      appointments = await Appointment.find({ doctor: doctor._id })
        .populate("patient", "name phone")
        .sort({ appointmentDate: 1 });
    }

    res.json(appointments);
  } catch (error) {
    next(error);
  }
};


export const cancelAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      res.status(404);
      throw new Error("Appointment not found");
    }

    // Patient can cancel only their own appointment
    if (req.user.role === "patient") {
      const patient = await Patient.findOne({ user: req.user._id });

      if (appointment.patient.toString() !== patient._id.toString()) {
        res.status(403);
        throw new Error("Not allowed to cancel this appointment");
      }
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    next(error);
  }
};
