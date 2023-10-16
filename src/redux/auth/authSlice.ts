import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface IUser {
  id: string
  email: string
  firstname: string
  lastname: string
}

export interface IUserState {
  user: IUser | null
  token: string | null
}

const initialState: IUserState = {
  token: null,
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUserState>) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
    },
    logOut: (state, _action: PayloadAction<typeof initialState>) => {
      state.user = null
      state.token = null
    }
  }
})

// actions
export const { setCredentials, logOut } = authSlice.actions
// reducer
export default authSlice.reducer
