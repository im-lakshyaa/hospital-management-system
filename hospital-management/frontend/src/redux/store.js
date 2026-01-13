import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "../features/doctor/doctorSlice";
import patientReducer from "../features/patient/patientSlice";
import appointmentReducer from "../features/appointment/appointmentSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorReducer,
    patients: patientReducer,
    appointments: appointmentReducer
  }
});
