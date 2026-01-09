import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    doctorId: {
      type: String,
      unique: true,
      required: true
    },

    name: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true
    },

    specialization: {
      type: String,
      required: true
    },

    qualification: {
      type: String
    },

    experience: {
      type: Number, 
      min: 0
    },

    department: {
      type: String,
      required: true
    },

    consultationFee: {
      type: Number,
      required: true
    },

    availability: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ]
        },
        startTime: String, 
        endTime: String   
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
