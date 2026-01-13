import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";


export const createPatient = createAsyncThunk(
  "patients/create",
  async (patientData, thunkAPI) => {
    try {
      const res = await api.post("/patients", patientData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create patient"
      );
    }
  }
);


export const fetchPatients = createAsyncThunk(
  "patients/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/patients");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch patients"
      );
    }
  }
);


export const fetchMyPatientProfile = createAsyncThunk(
  "patients/fetchMe",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/patients/me");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch patient profile"
      );
    }
  }
);



const patientSlice = createSlice({
  name: "patients",
  initialState: {
    list: [],
    myProfile: null,
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    clearPatientState: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder

      
      .addCase(createPatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list.push(action.payload);
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(fetchMyPatientProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyPatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.myProfile = action.payload;
      })
      .addCase(fetchMyPatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearPatientState } = patientSlice.actions;
export default patientSlice.reducer;
