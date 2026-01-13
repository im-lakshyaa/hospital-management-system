import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchDoctors = createAsyncThunk(
  "doctors/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/doctors");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctors"
      );
    }
  }
);


export const fetchMyDoctorProfile = createAsyncThunk(
  "doctors/fetchMe",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/doctors/me");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctor profile"
      );
    }
  }
);


export const createDoctor = createAsyncThunk(
  "doctors/create",
  async (doctorData, thunkAPI) => {
    try {
      const res = await api.post("/doctors", doctorData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create doctor"
      );
    }
  }
);



const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    list: [],
    myProfile: null,
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    clearDoctorState: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder

     
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMyDoctorProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.myProfile = action.payload;
      })
      .addCase(fetchMyDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list.push(action.payload);
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearDoctorState } = doctorSlice.actions;
export default doctorSlice.reducer;
