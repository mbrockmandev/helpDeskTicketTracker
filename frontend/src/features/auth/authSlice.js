import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';

// get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ?? null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (e) {
    const message =
      (e.response &&
        e.response.data &&
        e.response.data.message) ||
      e.message || e.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// login user
export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {

})

// logout user
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.logout()
  })

export const authSlice = createSlice({
    name: 'auth',
  initialState,
  reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null
      })
  }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;