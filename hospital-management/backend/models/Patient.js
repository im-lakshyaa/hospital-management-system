import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    
    patientId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true
    },

    age: {
      type: Number,
      required: true,
      min: 0
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    address: {
      type: String
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },

    allergies: [
      {
        type: String
      }
    ],

    medicalHistory: [
      {
        diagnosis: String,
        notes: String,
        date: {
          type: Date,
          default: Date.now
        }
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

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
