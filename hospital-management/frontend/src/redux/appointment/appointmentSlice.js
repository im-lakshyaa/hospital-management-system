import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const bookAppointment = createAsyncThunk(
  "appointments/book",
  async (appointmentData, thunkAPI) => {
    try {
      const res = await api.post("/appointments", appointmentData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to book appointment"
      );
    }
  }
);

export const fetchMyAppointments = createAsyncThunk(
  "appointments/fetchMy",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/appointments/my");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch appointments"
      );
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  "appointments/cancel",
  async (appointmentId, thunkAPI) => {
    try {
      const res = await api.patch(
        `/appointments/${appointmentId}/cancel`
      );
      return { id: appointmentId, data: res.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to cancel appointment"
      );
    }
  }
);


const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    list: [],
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    clearAppointmentState: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list.push(action.payload);
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMyAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMyAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.list = state.list.map((appt) =>
          appt._id === action.payload.id
            ? { ...appt, status: "cancelled" }
            : appt
        );
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAppointmentState } = appointmentSlice.actions;
export default appointmentSlice.reducer;
